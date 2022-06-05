using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; // Needed for [Column] and [DatabaseGeneratedOption]
namespace API.Models;

public class Sound
{
    [Key] public Guid Id { get; set; } // TODO: Use int instead for shorter urls?
    [Column(TypeName="datetime2(0)")] public DateTime CreatedOn { get; set; }
    [Column(TypeName="varchar(255)")] public string Title { get; set; } = null!; // Silence the null warning. // ARCHIVE: [MaxLength(255)]
    [Column(TypeName="varchar(4000)")] public string? Description { get; set; }
    public byte? Duration { get; set; } // Seconds.
    [Column(TypeName="decimal(4, 2)")] public decimal? Price { get; set; } // GBP.
    [Column(TypeName="varchar(255)")] public string? Preview { get; set; }
    [Column(TypeName="varchar(255)")] public string? ImageThumb { get; set; }
    [Column(TypeName="varchar(255)")] public string? Structure { get; set; }
    public byte? Rank { get; set; }
    // TODO: Add ImageFull property.
    public virtual ICollection<Tag>? Tags { get; set; }
         = new HashSet<Tag>();  // Initialise to an empty collection to avoid null reference issues.
    // A HashSet is type of ICollection that optimises insert & delete and enforces referential integrity. This is supposed to be better than a List which can't be added to / modified.
}

// Seperate Dto's help to reduce payload size, hide data, and decouple from the internal data structure.

public class SoundDetailDto
{
    public Guid Id { get; set; }
    public DateTime CreatedOn { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public byte? Duration { get; set; }
    public decimal? Price { get; set; }
    public string? Preview { get; set; }
    public string? ImageThumb { get; set; }
    public string? Structure { get; set; }
    public byte? Rank { get; set; }

    public virtual ICollection<TagSimpleDto>? Tags { get; set; } // TagSimpleDto doesn't contain a list of sounds - this prevents recursion (a Tag has Sounds, which have Tags...)
        = new HashSet<TagSimpleDto>();
}

public class SoundSimpleDto
{
    public Guid? Id { get; set; }
    public string? Title { get; set; }
    public decimal? Price { get; set; }
    public string? Preview { get; set; }
    public string? ImageThumb { get; set; }
    public byte? Rank { get; set; }
}

public class SoundPostDto
{
    public DateTime? CreatedOn { get; set; } // Optional in the Dto's, but required in the database (can be server generated).
    [Required(ErrorMessage = "Title is required")] public string Title { get; set; } = null!; // TODO: Recreate the validation dataannotations in all input Dto's, even though they're in the main model.
    public string? Description { get; set; }
    public byte? Duration { get; set; }
    public decimal? Price { get; set; }
    public string? Preview { get; set; }
    public string? ImageThumb { get; set; }
    public string? Structure { get; set; }
    public byte? Rank { get; set; }
    public virtual ICollection<TagIdOnlyDto>? Tags { get; set; } // TODO: Why is this virtual?
}

public class SoundPutDto
{
    public Guid Id { get; set; } // After reading https://stackoverflow.com/questions/27900041 I think it's best to include the Id in the body.
    public DateTime? CreatedOn { get; set; }
    [Required(ErrorMessage = "Title is required")] public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public byte? Duration { get; set; }
    public decimal? Price { get; set; }
    public string? Preview { get; set; }
    public string? ImageThumb { get; set; }
    public string? Structure { get; set; }
    public byte? Rank { get; set; }
    public virtual ICollection<TagIdOnlyDto>? Tags { get; set; }
}