using Action = MusicStore.Server.Models.Action;

namespace MusicStore.Server.Models;

public record GetSoundsResponse
{
    public IEnumerable<SimpleSound> Sounds { get; init; } = [];
    // TODO: Pagination
}

public record SimpleSound
{
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public short? Price { get; init; }
    public string? Preview { get; init; }
    public string? ImageThumb { get; init; }
    public byte? Rank { get; init; }
    public Action[]? Actions { get; init; }

    public static SimpleSound FromModel(Sound sound)
    {
        return new SimpleSound
        {
            Id = sound.Id,
            Title = sound.Title,
            Price = sound.PriceInPence,
            Preview = sound.PreviewUrl,
            ImageThumb = sound.ImageUrl,
            Actions = [
                new Action {
                    Description = "View details",
                    Verb = "GET",
                    Url = $"http://baseurl.com/api/sounds/{sound.Id}"
                }
            ]
        };
    }
}
