namespace MusicStore.Server.Models;

public class GetTagResponse
{
    public required Guid Id { get; init; }
    public required string Name { get; init; }
    public byte? Rank { get; init; }
}
