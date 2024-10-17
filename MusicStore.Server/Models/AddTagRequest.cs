namespace MusicStore.Server.Models;

public record AddTagRequest
{
    public required string Name { get; init; }
    public byte? Rank { get; init; }
}
