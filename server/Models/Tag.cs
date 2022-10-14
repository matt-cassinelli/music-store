using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace SoundStore.API.Models;

public class Tag
{
    public Tag()
    {
        this.Sounds = new HashSet<Sound>(); // Initialise to an empty collection to avoid null reference issues.
    }
    
    [Key] public short Id { get; set; }
    [Column(TypeName="varchar(255)")] public string Name { get; set; } = null!;
    public byte? Rank { get; set; }
    public virtual ICollection<Sound>? Sounds { get; set; }
}

public class ReadTagDto
{
    public short Id { get; set; }
    public string Name { get; set; } = null!;
    public byte? Rank { get; set; }
    public virtual ICollection<ReadSoundsDto>? Sounds { get; set; }
        = new HashSet<ReadSoundsDto>();
}

public class TagSimpleDto
{
    public short Id { get; set; }
    [Required] public string Name { get; set; } = null!;
    public byte? Rank { get; set; }
}

public class CreateTagDto
{
    [Required] public string Name { get; set; } = null!;
    public byte? Rank { get; set; }
}