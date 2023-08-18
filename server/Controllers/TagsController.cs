using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using SoundStore.API.Models;
namespace SoundStore.API.Controllers;

[ApiController]
[Route("[controller]")]
public class TagsController : ControllerBase
{
    private readonly MyDbContext _context;
    private readonly IMapper _mapper;

    public TagsController(MyDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TagSimpleDto>>> ReadList()
    {
        var query = _context.Tags
            .AsNoTracking()
            .OrderByDescending(s => s.Rank);
        var tags = await _mapper.ProjectTo<TagSimpleDto>(query).ToListAsync();
        return Ok(tags);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TagSimpleDto>> Read(short id)
    {
        var query = _context.Tags
            .AsNoTracking()
            .Where(s => s.Id == id);
        var tag = await _mapper.ProjectTo<TagSimpleDto>(query).FirstOrDefaultAsync();
        if (tag == null) { return NotFound(); }
        return Ok(tag);
    }

    // [todo] Implement get tags by page.

    [HttpPost]
    public async Task<ActionResult<TagSimpleDto>> Create([FromBody] CreateTagDto input)
    {
        if (input == null) { throw new ArgumentException(nameof(input)); }

        var tag = _mapper.Map<Tag>(input);

        _context.Tags.Add(tag);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Read), new { id = tag.Id }, _mapper.Map<TagSimpleDto>(tag));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update([FromBody] TagSimpleDto input, short id)
    {
        if (id != input.Id) { return BadRequest("Id's must match."); }

        var entityToUpdate = await _context.Tags.FindAsync(id);
        if (entityToUpdate == null) { return NotFound(); }

        _mapper.Map(input, entityToUpdate);
        _context.Entry(entityToUpdate).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(short id)
    {
        var toDelete = await _context.Tags.FindAsync(id);
        if (toDelete == null) { return NotFound(); }

        _context.Tags.Remove(toDelete);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}