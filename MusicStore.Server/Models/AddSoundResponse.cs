namespace MusicStore.Server.Models;

public record AddSoundResponse
{
    public required Guid Id { get; init; }
}
