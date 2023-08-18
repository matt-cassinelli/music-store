using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using SoundStore.API.Models;
namespace SoundStore.API.Controllers;

[ApiController]
[Route("[controller]")]
public class SoundsController : ControllerBase
{
    private readonly MyDbContext _context;
    private readonly IMapper _mapper;

    public SoundsController(MyDbContext context, IMapper mapper)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReadSoundsDto>>> ReadList([FromQuery] short? tagId)
    {
        IQueryable<Sound> query;

        if (tagId == null)
        {
            query = _context.Sounds
                .AsNoTracking();
        }
        else
        {
            query = _context.Sounds
                .Where(s => s.Tags.Any(t => tagId == t.Id));
        }

        query = query
            .OrderByDescending(s => s.Rank);

        var result = await _mapper.ProjectTo<ReadSoundDto>(query)
            .ToListAsync();

        // We don't need to implement NotFound() because an empty list could be a valid response.
        
        return Ok(result);
    }

    [HttpGet("{id}")] // Match the route https://host/sounds/(id)
    public async Task<ActionResult<ReadSoundDto>> Read(Guid id)
    {
        var query = _context.Sounds
            .AsNoTracking()
            .Where(s => s.Id == id);
        var result = await _mapper.ProjectTo<ReadSoundDto>(query).FirstOrDefaultAsync();
        if (result == null) { return NotFound(); }
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<ReadSoundDto>> Create([FromBody] CreateSoundDto input)
    {
        if (input.UploadedOn == null) { input.UploadedOn = DateTime.Now; } // Would DateTime.UtcNow be better?

        var sound = _mapper.Map<Sound>(input); // This mapping ignores tags. Instead they are mapped in a custom way below.

        foreach (var tagId in input.Tags)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Id == tagId);
            if (tag == null) { return NotFound(); }
            sound.Tags.Add(tag);
        }

        _context.Sounds.Add(sound);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            actionName: nameof(Read), // The action you can use to get the resource.
            routeValues: new {id = sound.Id}, // The id or route.
            value: _mapper.Map<ReadSoundDto>(sound) // The newly created resource.
        );

        // Another option is to return just the id or location instead of the entire resource. Depends on what the client will do after creation.
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update([FromBody] UpdateSoundDto input, Guid id)
    {
        if (id != input.Id) { return BadRequest("Id's must match."); }

        var entityToUpdate = await _context.Sounds
            .Include(s => s.Tags) // Eagerly load the tags, otherwise EF thinks there are none.
            .FirstOrDefaultAsync(s => s.Id == id);

        if (entityToUpdate == null) { return NotFound(); }

        _mapper.Map(input, entityToUpdate);

        entityToUpdate.Tags.Clear();
        // To delete from the Tag table rather than SoundTag: entityToUpdate.Tags.ToList().ForEach(t => _context.Remove(t));

        foreach (var tagId in input.Tags)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Id == tagId);
            if (tag == null) { return NotFound(); }
            entityToUpdate.Tags.Add(tag);
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var entityToDelete = await _context.Sounds.FindAsync(id);

        if (entityToDelete == null) { return NotFound(); }

        _context.Sounds.Remove(entityToDelete);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}