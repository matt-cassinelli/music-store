namespace MusicStore.Server.Models;

public record UpdateSoundRequest
{
    public required Guid Id { get; init; } // https://stackoverflow.com/questions/27900041
    public required DateTime UploadedOn { get; init; }
    public required string Title { get; init; } // TODO: Validate with FluentValidation
    public string? Description { get; init; }
    public byte? Duration { get; init; }
    public short? Price { get; init; }
    public string? PreviewUrl { get; init; }
    public string? ImageUrl { get; init; }
    public string? Structure { get; init; }
    public byte? Rank { get; init; }
    public virtual ICollection<Guid> Tags { get; init; } = [];
}
