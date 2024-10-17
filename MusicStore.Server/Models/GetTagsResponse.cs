namespace MusicStore.Server.Models;

public record GetTagsResponse
{
    public IEnumerable<GetTagResponse> Tags { get; init; } = []; // TODO: Create separate Dto with Actions property
}
