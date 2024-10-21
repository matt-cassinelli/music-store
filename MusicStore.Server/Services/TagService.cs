using Microsoft.EntityFrameworkCore;
using MusicStore.Server.EntityFramework;
using MusicStore.Server.Models;
using MusicStore.Server.Results;
using System.Net;

namespace MusicStore.Server.Services;

public class TagService(AppDbContext context)
{
    private readonly AppDbContext _context = context;

    public async Task<GetTagsResponse> GetAll()
    {
        var tags = await _context.Tags
            .AsNoTracking()
            .Select(t => new GetTagResponse { Id = t.Id, Name = t.Name, Rank = t.Rank })
            .OrderByDescending(t => t.Rank)
            .ToListAsync();
          //.IgnoreAutoIncludes()

        return new GetTagsResponse
        {
            Tags = tags
        };
    }

    public async Task<Result<Tag>> Get(Guid id)
    {
        var tag = await _context.Tags
            .AsNoTracking()
            .SingleOrDefaultAsync(t => t.Id == id);

        if (tag is null)
        {
            var error = new Error($"Tag {id} not found.", HttpStatusCode.NotFound);
            return Result<Tag>.Failure(error);
        }

        return Result<Tag>.Success(tag);
    }


    public async Task<Result<AddTagResponse>> Add(AddTagRequest input)
    {
        // TODO: Validation

        var tag = new Tag
        {
            Id = Guid.NewGuid(),
            CreatedOn = DateTime.UtcNow,
            Rank = input.Rank ?? 127,
            Name = input.Name
        };

        _context.Tags.Add(tag);
        await _context.SaveChangesAsync();
        var response = new AddTagResponse { Id = tag.Id };
        return Result<AddTagResponse>.Success(response);
    }

    public async Task<Result> Update(Tag input, Guid idFromRoute)
    {
        if (input.Id != idFromRoute)
        {
            var error = new Error("Id's do not match", HttpStatusCode.BadRequest);
            return Result.Failure(error);
        }

        // TODO: Validation

        var entityToUpdate = await _context.Tags.FindAsync(input.Id);

        if (entityToUpdate is null)
        {
            var error = new Error($"Tag {input.Id} not found.", HttpStatusCode.NotFound);
            return Result.Failure(error);
        }

        _context.Entry(entityToUpdate).CurrentValues.SetValues(input); // TODO: Is this best practice?
        await _context.SaveChangesAsync();
        return Result.Success();
    }

    public async Task<Result> Delete(Guid id)
    {
        var toDelete = await _context.Tags.FindAsync(id);

        if (toDelete is null)
        {
            var error = new Error($"Sound {id} not found.", HttpStatusCode.NotFound);
            return Result.Failure(error);
        }

        // TODO: Test cascade

        _context.Tags.Remove(toDelete);
        await _context.SaveChangesAsync();
        return Result.Success();
    }
}
