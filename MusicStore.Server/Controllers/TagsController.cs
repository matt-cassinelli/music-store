using Microsoft.AspNetCore.Mvc;
using MusicStore.Server.Models;
using MusicStore.Server.Services;
using System.Net;

namespace MusicStore.Server.Controllers;

[ApiController]
public class TagsController(TagService service) : ControllerBase
{
    private readonly TagService _service = service;

    [HttpGet("api/tags")]
    public async Task<ActionResult> GetAll()
    {
        var response = await _service.GetAll();
        return Ok(response);
    }

    [HttpGet("api/tags/{id}")]
    public async Task<ActionResult> Get(Guid id)
    {
        var result = await _service.Get(id);

        if (result.IsFailure)
            return StatusCode((int)result.Error.StatusCode, result.Error.ToApiResponse());

        return Ok(result.Value);
    }

    [HttpPost("api/tags")]
    public async Task<ActionResult> Add([FromBody] AddTagRequest input)
    {
        var result = await _service.Add(input);

        if (result.IsFailure)
            return StatusCode((int)result.Error.StatusCode, result.Error.ToApiResponse());

        return CreatedAtAction(nameof(Get), new { Id = result.Value.Id } , null);
    }

    [HttpPut("api/tags/{id}")]
    public async Task<ActionResult> Update([FromBody] Tag input, Guid id)
    {
        var result = await _service.Update(input, id);

        if (result.IsFailure)
            return StatusCode((int)result.Error.StatusCode, result.Error.ToApiResponse());

        return NoContent();
    }

    [HttpDelete("api/tags/{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var result = await _service.Delete(id);

        if (result.IsFailure)
            return StatusCode((int)result.Error.StatusCode, result.Error.ToApiResponse());

        return NoContent();
    }
}
