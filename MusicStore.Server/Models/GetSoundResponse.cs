using Action = MusicStore.Server.Models.Action;

namespace MusicStore.Server.Models;

public record GetSoundResponse
{
    public required Guid Id { get; init; }
    public required DateTime UploadedOn { get; init; }
    public required string Title { get; init; }
    public required string? Description { get; init; }
    public byte? Duration { get; init; }
    public short? Price { get; init; }
    public string? Preview { get; init; }
    public string? ImageThumb { get; init; }
    public string? Structure { get; init; }
    public byte? Rank { get; init; }
    public required ICollection<GetTagResponse> Tags { get; init; }
    public IEnumerable<Action>? Actions { get; init; }

    public static GetSoundResponse FromSound(Sound sound)
    {
        return new GetSoundResponse
        {
            Id = sound.Id,
            UploadedOn = sound.UploadedOn,
            Title = sound.Title,
            Description = sound.Description,
            Duration = sound.DurationInSeconds,
            Price = sound.PriceInPence,
            Preview = sound.PreviewUrl,
            ImageThumb = sound.ImageUrl,
            Structure = sound.Structure,
            Rank = sound.Rank,
            Tags = sound.Tags
                .Select(t => new GetTagResponse { Id = t.Id, Name = t.Name, Rank = t.Rank })
                .ToList(),
            Actions = [
                new Action {
                    Description = "Delete",
                    Verb = "DELETE",
                    Url = $"https://baseurl.com/api/sounds/${sound.Id}"
                },
            ]
        };
    }
}
