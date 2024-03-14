using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MusicStore.Server.Models;

namespace MusicStore.Server.Controllers;

[ApiController]
public class SoundsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public SoundsController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet("api/sounds")]
    public async Task<ActionResult<IEnumerable<ReadSoundsDto>>> GetSounds([FromQuery] short? tagId)
    {
        IQueryable<Sound> query = _context.Sounds.AsNoTracking();

        if (tagId is not null)
        {
            query = query
                .Where(s => s.Tags.Any(t => tagId == t.Id));
        }

        query = query
            .OrderByDescending(s => s.Rank);

        var result = await _mapper
            .ProjectTo<ReadSoundDto>(query)
            .ToListAsync();

        return Ok(result);
    }

    [HttpGet("api/sounds/{id}")]
    public async Task<ActionResult<ReadSoundDto>> GetSound(Guid id)
    {
        var query = _context.Sounds
            .AsNoTracking()
            .Where(s => s.Id == id);

        var result = await _mapper.ProjectTo<ReadSoundDto>(query).FirstOrDefaultAsync();
        
        if (result is null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpPost("api/sounds")]
    public async Task<ActionResult<ReadSoundDto>> CreateSound([FromBody] CreateSoundDto input)
    {
        if (input.UploadedOn == null) { input.UploadedOn = DateTime.UtcNow; }

        var sound = _mapper.Map<Sound>(input); // This mapping ignores tags. Instead they are mapped in a custom way below.

        foreach (var tagId in input.Tags)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Id == tagId);

            if (tag == null)
            {
                return NotFound();
            }
            
            sound.Tags.Add(tag);
        }

        _context.Sounds.Add(sound);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            actionName: nameof(GetSound), // The action you can use to get the resource.
            routeValues: new {id = sound.Id}, // The id or route.
            value: _mapper.Map<ReadSoundDto>(sound) // The newly created resource. TODO: Remove - not needed
        );
    }

    [HttpPut("api/sounds/{id}")]
    public async Task<ActionResult> UpdateSound([FromBody] UpdateSoundDto input, Guid id)
    {
        if (id != input.Id) { return BadRequest("Id's must match."); }

        var entityToUpdate = await _context.Sounds
            .Include(s => s.Tags) // Eagerly load the tags, otherwise EF thinks there are none.
            .FirstOrDefaultAsync(s => s.Id == id);

        if (entityToUpdate == null)
        {
            return NotFound();
        }

        _mapper.Map(input, entityToUpdate);

        entityToUpdate.Tags.Clear();
        // To delete from the Tag table rather than SoundTag: entityToUpdate.Tags.ToList().ForEach(t => _context.Remove(t));

        foreach (var tagId in input.Tags)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Id == tagId);

            if (tag == null)
            {
                return NotFound();
            }

            entityToUpdate.Tags.Add(tag);
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("api/sounds/{id}")]
    public async Task<ActionResult> DeleteSound(Guid id)
    {
        var entityToDelete = await _context.Sounds.FindAsync(id);

        if (entityToDelete == null)
        {
            return NotFound();
        }

        _context.Sounds.Remove(entityToDelete);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}
