using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace API.Models;

public class Tag
{
    [Key] public short Id { get; set; }
    [Column(TypeName="varchar(255)")] public string Name { get; set; } = null!;
    public byte? Rank { get; set; }

    public virtual ICollection<Sound>? Sounds { get; set; }
        = new HashSet<Sound>();
}

public class TagDetailDto
{
    public short Id { get; set; }
    public string Name { get; set; } = null!;
    public byte? Rank { get; set; } // TODO: Check nullability and attributes on each Dto
    public virtual ICollection<SoundSimpleDto>? Sounds { get; set; }
        = new HashSet<SoundSimpleDto>();
}

public class TagSimpleDto
{
    public short Id { get; set; }
    [Required(ErrorMessage = "Name is required")] public string Name { get; set; } = null!;
    public byte? Rank { get; set; }
}

public class TagIdOnlyDto // TODO: Remove this and replace with .Select() in the controller.
{
    public short Id { get; set; }
}

public class TagPostDto
{
    [Required(ErrorMessage = "Name is required")] public string Name { get; set; } = null!;
    public byte? Rank { get; set; }
}