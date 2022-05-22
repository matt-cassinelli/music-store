using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using API.Models;
namespace API.Controllers;

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
    public async Task<ActionResult<IEnumerable<TagSimpleDto>>> GetAll()
    {
        var tags = await _context.Tags.Select(s => _mapper.Map<TagSimpleDto>(s)).ToListAsync();
        // TODO: Try "= _mapper.Map<TagSimpleDto>(_context.Tags.ToList)" instead

        return Ok(tags);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Tag>> Get(short id)
    {
        var tag = await _context.Tags.FindAsync(id);
        if (tag != null) { return Ok(tag); }

        return NotFound();
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] TagPostDto input)
    {
        if (input == null) { throw new ArgumentException(nameof(input)); }

        var tag = _mapper.Map<Tag>(input);

        _context.Tags.Add(tag);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = tag.Id }, tag);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put([FromBody] TagSimpleDto input, short id)
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

    // [HttpGet("{id}/Sounds")]
    // public async Task<ActionResult<SoundSimpleDto>> GetSoundsByTag(short tagId)
    // {
    //     var sounds = await _context.Sounds.Where(s => s.Tags.Id == tagId).ToListAsync();
    //     return Ok(_mapper.Map<IEnumerable<SoundSimpleDto>>(sounds));
    // }
}