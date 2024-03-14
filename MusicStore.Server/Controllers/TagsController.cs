using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MusicStore.Server.Models;

namespace MusicStore.Server.Controllers;

[ApiController]
public class TagsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public TagsController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet("api/tags")]
    public async Task<ActionResult<IEnumerable<TagSimpleDto>>> GetTags()
    {
        var query = _context.Tags
            .AsNoTracking()
            .OrderByDescending(s => s.Rank);

        var tags = await _mapper.ProjectTo<TagSimpleDto>(query).ToListAsync();

        return Ok(tags);
    }

    [HttpGet("api/tags/{id}")]
    public async Task<ActionResult<TagSimpleDto>> GetTag(short id)
    {
        var query = _context.Tags
            .AsNoTracking()
            .Where(s => s.Id == id);

        var tag = await _mapper.ProjectTo<TagSimpleDto>(query).FirstOrDefaultAsync();

        if (tag == null)
        {
            return NotFound();
        }

        return Ok(tag);
    }

    [HttpPost("api/tags")]
    public async Task<ActionResult<TagSimpleDto>> CreateTag([FromBody] CreateTagDto input)
    {
        if (input is null)
        { 
            throw new ArgumentException(nameof(input));
        }

        var tag = _mapper.Map<Tag>(input);

        _context.Tags.Add(tag);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTag), new { id = tag.Id }, _mapper.Map<TagSimpleDto>(tag));
    }

    [HttpPut("api/tags/{id}")]
    public async Task<ActionResult> UpdateTag([FromBody] TagSimpleDto input, short id)
    {
        if (id != input.Id) { return BadRequest("Id's must match."); }

        var entityToUpdate = await _context.Tags.FindAsync(id);

        if (entityToUpdate == null)
        {
            return NotFound();
        }

        _mapper.Map(input, entityToUpdate);

        _context.Entry(entityToUpdate).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("api/tags/{id}")]
    public async Task<ActionResult> Delete(short id)
    {
        var toDelete = await _context.Tags.FindAsync(id);

        if (toDelete is null)
        { 
            return NotFound();
        }

        _context.Tags.Remove(toDelete);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}
