namespace MusicStore.Server.Models;

public record Action
{
    public required string Verb { get; init; } // GET | PUT | POST | DEL
    public required string Description { get; init; }
    public required string Url { get; init; }
}
