using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using API.Models;
namespace API.Controllers;

// Web API instantiates a controller when it routes the request and disposes it when finished.
[ApiController] // Enable automatic model validation, automatic HTTP 4XX / 5XX status codes for errors, and other useful features.
[Route("[controller]")] // Define a prefix for all other routes. "[controller]" gets replaced with the controller's class name minus "Controller" at the end, so in this case: https://host/sounds
public class SoundsController : ControllerBase // ControllerBase gives us commonly used API features such as access to the current user and IActionResult reponse code methods.
{
    private readonly MyDbContext _context;
    private readonly IMapper _mapper;

    public SoundsController(MyDbContext context, IMapper mapper)
    {
        _context = context; // When the constructor is called, inject these services and keep them available in private fields for the lifetime of the controller instance.
        _mapper = mapper;   // They will be disposed automatically because their Service Lifetime is set to Scoped.
    }

    [HttpGet] // Match the route https://host/sounds
    public async Task<ActionResult<IEnumerable<SoundSimpleDto>>> GetAll()
    {
        var sounds = await _context.Sounds.Select(s => _mapper.Map<SoundSimpleDto>(s)).ToListAsync();
        return Ok(sounds); // No need for a NotFound() because we consider an empty list to be a valid response.
    }

    [HttpGet("{id}")] // Match the route https://host/sounds/(id)
    public async Task<ActionResult<Sound>> Get(Guid id)
    {
        var sound = await _context.Sounds.FindAsync(id);
        if (sound == null) { return NotFound(); }
        return Ok(sound);
    }

    [HttpPost]
    public async Task<ActionResult<Sound>> Post([FromBody] SoundPostDto input)
    {
        if (input == null) { throw new ArgumentException(nameof(input)); }

        if (input.CreatedOn == null) { input.CreatedOn = DateTime.Now; } // TODO: Is DateTime.UtcNow better?

        var sound = _mapper.Map<Sound>(input);

        _context.Sounds.Add(sound);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new {id = sound.Id}, sound);
        // CreatedAtAction: Returns a 201 status code.
        // 1st arg: The action you can use to get the resource.
        // 2nd arg: The id or route.
        // 3rd arg: The newly created resource.
        // Another option would be to return just the id or location instead of the entire resource. Which option you choose should depend on what the client will do after creation.
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put([FromBody] SoundPutDto input, Guid id)
    {
        if (id != input.Id) { return BadRequest("Id's must match."); }

        var entityToUpdate = await _context.Sounds.FindAsync(id); // TODO: Does this have to be async? Without async, will the next line execute before the data is loaded?
        // v2:             = await _context.Sounds.FirstOrDefaultAsync(x => x.Id == id);
        // v1:                     _context.Sounds.Where(s => s.Id == id);

        if (entityToUpdate == null) { return NotFound(); }

        _mapper.Map(input, entityToUpdate); // We can do this instead of writing "entityToUpdate.Title = input.Title" and so on...

        _context.Entry(entityToUpdate).State = EntityState.Modified; // Tell EF that the entity has been changed (unnecessary most of the time).

        // _context.Sounds.Attach(entityToUpdate);
        // _context.Sounds.Update(entityToUpdate);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var toDelete = await _context.Sounds.FindAsync(id);

        if (toDelete == null) { return NotFound(); }

        _context.Sounds.Remove(toDelete);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // TODO: Create GetByTag ?
    // TODO: Create Login
}