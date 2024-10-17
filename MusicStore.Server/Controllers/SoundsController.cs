using Microsoft.AspNetCore.Mvc;
using MusicStore.Server.Models;
using MusicStore.Server.Services;

namespace MusicStore.Server.Controllers;

[ApiController]
public class SoundsController(SoundService service) : ControllerBase
{
    private readonly SoundService _service = service;

    [HttpGet("api/sounds")]
    public async Task<ActionResult> GetMany([FromQuery] Guid? tagId)
    {
        var result = await _service.GetMany(tagId);
        return Ok(result);
    }

    [HttpGet("api/sounds/{id}")]
    public async Task<ActionResult> Get(Guid id)
    {
        var result = await _service.Get(id);

        if (result.IsFailure)
            return StatusCode((int)result.Error.StatusCode, result.Error.ToApiResponse());

        return Ok(result.Value);
    }

    [HttpPost("api/sounds")]
    public async Task<ActionResult> Add([FromBody] AddSoundRequest input)
    {
        var result = await _service.Add(input);

        if (result.IsFailure)
            return StatusCode((int)result.Error.StatusCode, result.Error.ToApiResponse());

        return CreatedAtAction(nameof(Get), new { Id = result.Value.Id }, null);
    }

    [HttpPut("api/sounds/{id}")]
    public async Task<ActionResult> Update([FromBody] UpdateSoundRequest input, Guid id)
    {
        var result = await _service.Update(input, id);
 
        if (result.IsFailure)
            return StatusCode((int)result.Error.StatusCode, result.Error.ToApiResponse());

        return NoContent();
    }

    [HttpDelete("api/sounds/{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var result = await _service.Delete(id);

        if (result.IsFailure)
            return StatusCode((int)result.Error.StatusCode, result.Error.ToApiResponse());

        return NoContent();
    }
}
