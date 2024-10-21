namespace MusicStore.Server.Models;

public record AddSoundRequest
{
    public DateTime? UploadedOn { get; init; } // Optional (can be server generated).
    public required string Title { get; init; }
    public string? Description { get; init; }
    public byte? DurationInSeconds { get; init; }
    public short PriceInPence { get; init; }
    public string? PreviewUrl { get; init; }
    public string? ImageUrl { get; init; }
    public string? Structure { get; init; }
    public byte? Rank { get; init; }
    public ICollection<Guid> Tags { get; init; } = [];
    public required IFormFile File { get; init; }
}
