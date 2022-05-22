using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace API.Models;

public class Tag
{
    // public Tag()
    // {
    //     Sounds = new HashSet<Sound>();
    // }

    [Key] public short Id { get; set; }
    [Required(ErrorMessage = "Name is required")] [Column(TypeName="varchar(255)")] public string Name { get; set; } = null!;
    public byte? Popularity { get; set; } // TODO: Rename to Rank
    public virtual ICollection<SoundSimpleDto>? Sounds { get; set; }
}

public class TagSimpleDto
{
    public short Id { get; set; }
    public string Name { get; set; } = null!;
    public byte? Popularity { get; set; }
}

public class TagIdOnlyDto
{
    public short Id { get; set; }
}

public class TagPostDto
{
    [Required(ErrorMessage = "Name is required")] [Column(TypeName="varchar(255)")] public string Name { get; set; } = null!;
    public byte? Popularity { get; set; }
}