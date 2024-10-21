using Microsoft.EntityFrameworkCore;
using MusicStore.Server.EntityFramework;
using MusicStore.Server.Models;
using MusicStore.Server.Results;
using MusicStore.Server.Constants;
using System.Net;

namespace MusicStore.Server.Services;

public class SoundService(AppDbContext context, BlobService blobService)
{
    private readonly AppDbContext _context = context;
    private readonly BlobService _blobService = blobService;

    public async Task<GetSoundsResponse> GetMany(Guid? tagId)
    {
        IQueryable<Sound> query = _context.Sounds
            .AsNoTracking();

        if (tagId is not null)
            query = query.Where(s => s.Tags.Any(t => tagId == t.Id));

        return new GetSoundsResponse
        {
            Sounds = await query
                .OrderByDescending(s => s.Rank)
                .Select(s => SimpleSound.FromModel(s))
                .ToListAsync()
        };
    }

    public async Task<Result<GetSoundResponse>> Get(Guid id)
    {
        var sound = await _context.Sounds
            .AsNoTracking()
            .Include(s => s.Tags)
            .SingleOrDefaultAsync(s => s.Id == id);

        if (sound is null)
        {
            var error = new Error($"Sound {id} not found.", HttpStatusCode.NotFound);
            return Result<GetSoundResponse>.Failure(error);
        }

        var output = GetSoundResponse.FromSound(sound);
        return Result<GetSoundResponse>.Success(output);
    }

    public async Task<Result<AddSoundResponse>> Add(AddSoundRequest input)
    {
        // TODO: Validation

        var id = Guid.NewGuid();

        var url = await _blobService.Upload(
            file: input.File.OpenReadStream(),
            fileName: $"{id}.mp3",
            containerName: ContainerName.PreviewClips);

        var sound = new Sound
        {
            Id = id,
            Description = input.Description,
            DurationInSeconds = input.DurationInSeconds,
            PriceInPence = input.PriceInPence,
            PreviewUrl = url.ToString(),
            ImageUrl = input.ImageUrl,
            Structure = input.Structure,
            Rank = input.Rank ?? 127,
            Tags = [],
            Title = input.Title,
            UploadedOn = input.UploadedOn ?? DateTime.UtcNow
        };

        foreach (var tagId in input.Tags)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Id == tagId);

            if (tag == null)
            {
                var error = new Error($"Tag {tagId} not found.", HttpStatusCode.BadRequest);
                return Result<AddSoundResponse>.Failure(error);
            }

            sound.Tags.Add(tag);
        }

        _context.Sounds.Add(sound);
        await _context.SaveChangesAsync();
        var response = new AddSoundResponse { Id = sound.Id };
        return Result<AddSoundResponse>.Success(response);
    }

    public async Task<Result> Update(UpdateSoundRequest request, Guid idFromRoute)
    {
        if (idFromRoute != request.Id)
        {
            var error = new Error("Id's do not match", HttpStatusCode.BadRequest);
            return Result.Failure(error);
        }

        var sound = await _context.Sounds
            .Include(s => s.Tags)
            .FirstOrDefaultAsync(s => s.Id == request.Id);

        if (sound is null)
        {
            var error = new Error($"Sound {request.Id} not found", HttpStatusCode.NotFound);
            return Result.Failure(error);
        }

        // TODO: Validation

        sound.Title = request.Title;
        sound.Rank = request.Rank ?? 127;
        sound.Structure = request.Structure;
        sound.PreviewUrl = request.PreviewUrl;
        sound.ImageUrl = request.ImageUrl;

        sound.Tags.Clear();

        foreach (var tagId in request.Tags)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Id == tagId);

            if (tag is null)
            {
                var error = new Error($"Tag {tagId} not found.", HttpStatusCode.NotFound);
                return Result.Failure(error);
            }

            sound.Tags.Add(tag);
        }

        await _context.SaveChangesAsync();
        return Result.Success();
    }

    public async Task<Result> Delete(Guid id)
    {
        var entityToDelete = await _context.Sounds.FindAsync(id);

        if (entityToDelete is null)
        {
            var error = new Error($"Sound {id} not found.", HttpStatusCode.NotFound);
            return Result.Failure(error);
        }

        _context.Sounds.Remove(entityToDelete);
        await _context.SaveChangesAsync();
        return Result.Success();
    }
}