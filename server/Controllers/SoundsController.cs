using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using SoundStore.API.Models;
namespace SoundStore.API.Controllers;

// Web API instantiates a controller when it routes the request and disposes it when finished.
[ApiController] // Enable automatic model validation, automatic HTTP 4XX / 5XX status codes for errors, and other useful features.
[Route("[controller]")] // Define a prefix for all other routes. "[controller]" gets replaced with the controller's class name minus "Controller" at the end, so in this case: https://host/sounds
public class SoundsController : ControllerBase // ControllerBase gives us commonly used API features such as access to the current user and IActionResult reponse code methods.
{
    private readonly MyDbContext _context;
    private readonly IMapper _mapper;

    public SoundsController(MyDbContext context, IMapper mapper)
    {
         // When the constructor is called, inject these services and keep them available in private fields for the lifetime of the controller instance. They will be disposed automatically because their Service Lifetime is set to Scoped.
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    [HttpGet] // Match the route https://host/sounds with optional ?tagId=1&tagId=2
    public async Task<ActionResult<IEnumerable<ReadSoundsDto>>> ReadList([FromQuery] short? tagId) // TODO: Implement paging, top 15 results. TODO: Allow requests for other ordering options e.g. price.
    {
        IQueryable<Sound> query; // Initialise empty query chain that we will build up.

        if (tagId == null) // Get all sounds.
        {
            query = _context.Sounds
                .AsNoTracking();
        }
        else // Get sounds with the specified tag.
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
        // ARCHIVE:
        // var sound = await _context.Sounds.FindAsync(id);
        // return Ok(_mapper.Map<ReadSoundDto>(sound));

        // ARCHIVE:
        // var sound = await _context.Sounds
        //     .Where(s => s.Id == id)
        //     .Select(s => _mapper.Map<ReadSoundDto>(s))
        //     .FirstOrDefaultAsync();
        // return Ok(sound);

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
        if (input.UploadedOn == null) { input.UploadedOn = DateTime.Now; } // TODO: Would DateTime.UtcNow or a timespan be better? Also should we allow the client to change the UploadedOn or have it server generated only?

        var sound = _mapper.Map<Sound>(input); // This mapping ignores tags. Instead they are mapped in a custom way below.

        foreach (var tagId in input.Tags)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Id == tagId);
            if (tag == null) { return NotFound(); }
            sound.Tags.Add(tag);
        }

        _context.Sounds.Add(sound);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Read), new {id = sound.Id}, _mapper.Map<ReadSoundDto>(sound)); // TODO: Try return CreatedAtAction(nameof(Get), new {id = sound.Id});
        // returns a 201 status code. 1st arg: The action you can use to get the resource.
        // 2nd arg: The id or route. 3rd arg: The newly created resource.
        // Another option would be to return just the id or location instead of the entire resource. Which option you choose should depend on what the client will do after creation.
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update([FromBody] UpdateSoundDto input, Guid id)
    {
        if (id != input.Id) { return BadRequest("Id's must match."); }

        var entityToUpdate = await _context.Sounds // Does this have to be async? Without async, will the next line execute before the data is loaded?
            .Include(s => s.Tags) // Eagerly load the tags, otherwise the engine think there are none.
            .FirstOrDefaultAsync(s => s.Id == id); // For some reason FindAsync() was incompatible with .Include()

        if (entityToUpdate == null) { return NotFound(); }

        _mapper.Map(input, entityToUpdate); // We can do this instead of writing "entityToUpdate.Title = input.Title" and so on...

        entityToUpdate.Tags.Clear();
        // entityToUpdate.Tags.ToList().ForEach(t => _context.Remove(t)); // This deletes from the Tag rather than SoundTag table

        foreach (var tagId in input.Tags)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Id == tagId);
            if (tag == null) { return NotFound(); }
            entityToUpdate.Tags.Add(tag);
        }

        await _context.SaveChangesAsync();

        return NoContent(); // Returns 204 status code.
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