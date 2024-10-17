namespace MusicStore.Server.Models;

/// <summary>
/// Loosely based on https://datatracker.ietf.org/doc/html/rfc7807
/// </summary>
public record ProblemDetails
{
    public required string Reason { get; init; }
    public string[]? Fields { get; init; }
    //public Action[]? Actions { get; init; }
}
