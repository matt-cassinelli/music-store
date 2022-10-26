using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; // Needed for [Required]
using System.ComponentModel.DataAnnotations.Schema; // Needed for [Column] and [DatabaseGeneratedOption]
namespace SoundStore.API.Models;

public class Sound
{
    public Sound()
    {
        this.Tags = new HashSet<Tag>(); // Initialise to an empty collection to avoid null reference issues.
    }

    [Key] public Guid Id { get; set; }
    [Column(TypeName="datetime2(0)")] public DateTime UploadedOn { get; set; } // Required (can be server generated).
    [Column(TypeName="varchar(255)")] public string Title { get; set; } = null!; // Silence the null warning. // [old] [MaxLength(255)]
    [Column(TypeName="varchar(4000)")] public string? Description { get; set; }
    public byte? Duration { get; set; } // Seconds.
    [Column(TypeName="decimal(4, 2)")] public decimal? Price { get; set; } // GBP.
    [Column(TypeName="varchar(255)")] public string? Preview { get; set; }
    [Column(TypeName="varchar(255)")] public string? ImageThumb { get; set; }
    [Column(TypeName="varchar(255)")] public string? Structure { get; set; }
    public byte? Rank { get; set; }
    // [todo] Add ImageFull property.
    public virtual ICollection<Tag> Tags { get; set; } // virtual makes it lazy load.
        // [old] = new HashSet<Tag>();  // Initialise to an empty collection to avoid null reference issues.
    // A HashSet is type of ICollection that optimises insert & delete and enforces referential integrity. This is supposed to be better than a List which can't be added to / modified.
}

// Seperate Dto's help to reduce payload size, hide data, and decouple from the internal data structure.

public class ReadSoundDto
{
    public ReadSoundDto()
    {
        this.Tags = new HashSet<TagSimpleDto>(); // Initialise to an empty collection to avoid null reference issues.
    }

    public Guid Id { get; set; }
    public DateTime UploadedOn { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public byte? Duration { get; set; }
    public decimal? Price { get; set; }
    public string? Preview { get; set; }
    public string? ImageThumb { get; set; }
    public string? Structure { get; set; }
    public byte? Rank { get; set; }

    public virtual ICollection<TagSimpleDto>? Tags { get; set; } // Doesn't contain a list of sounds - this prevents recursion (a Tag has Sounds, which have Tags...)
        // [old] = new HashSet<TagSimpleDto>();
}

public class ReadSoundsDto
{
    public Guid? Id { get; set; }
    public string? Title { get; set; }
    public decimal? Price { get; set; }
    public string? Preview { get; set; }
    public string? ImageThumb { get; set; }
    public byte? Rank { get; set; }
}

public class CreateSoundDto
{
    public CreateSoundDto()
    {
        this.Tags = new HashSet<short>();
    }

    public DateTime? UploadedOn { get; set; } // Optional (can be server generated).
    [Required] public string Title { get; set; } = null!; // [todo] Test there is a 400 error when length exceeded.
    public string? Description { get; set; }
    public byte? Duration { get; set; }
    public decimal? Price { get; set; }
    public string? Preview { get; set; }
    public string? ImageThumb { get; set; }
    public string? Structure { get; set; }
    public byte? Rank { get; set; }
    public virtual ICollection<short> Tags { get; set; } // When a navigation property is set to virtual, EF turns on lazy loading for it.
        // [old] = new HashSet<short>();
}

public class UpdateSoundDto
{
    public UpdateSoundDto()
    {
        this.Tags = new HashSet<short>();
    }

    public Guid Id { get; set; } // After reading https://stackoverflow.com/questions/27900041 I think it's best to include the Id in the body.
    public DateTime? UploadedOn { get; set; }
    [Required(ErrorMessage = "Title is required")] public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public byte? Duration { get; set; }
    public decimal? Price { get; set; }
    public string? Preview { get; set; }
    public string? ImageThumb { get; set; }
    public string? Structure { get; set; }
    public byte? Rank { get; set; }
    public virtual ICollection<short> Tags { get; set; }
}