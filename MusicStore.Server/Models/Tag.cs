namespace MusicStore.Server.Models;

public class Tag
{
    public required Guid Id { get; init; }
    public required DateTime CreatedOn { get; init; }
    public required string Name { get; init; }
    public required byte Rank { get; init; }
    public virtual ICollection<Sound> Sounds { get; set; } = [];
}
