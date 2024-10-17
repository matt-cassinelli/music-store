namespace MusicStore.Server.Models;

public class Sound
{
    public required Guid Id { get; init; }
    public required DateTime UploadedOn { get; init; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public byte? DurationInSeconds { get; set; } // TODO: Calculate
    public short? PriceInPence { get; set; }
    public string? PreviewUrl { get; set; } // TODO: Test Uri type
    public string? ImageUrl { get; set; }
    public string? Structure { get; set; }
    public byte? Rank { get; set; } // 0 - 255
    public ICollection<Tag> Tags { get; set; } = []; // Many-to-many
}
