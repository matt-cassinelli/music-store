using System.ComponentModel.DataAnnotations;

namespace MusicStore.Server.Models;

public class Sound
{
    public Sound()
    {
        this.Tags = new HashSet<Tag>(); // Initialise to an empty collection to avoid null reference issues.
    }

    [Key] public Guid Id { get; set; }

    //[Column(TypeName = "datetime2(0)")]
    public DateTime UploadedOn { get; set; } // Required (can be server generated).

    //[Column(TypeName = "varchar(255)")]
    public string Title { get; set; } = null!; // Silence the null warning.

    //[Column(TypeName = "varchar(4000)")]
    public string? Description { get; set; }
    public byte? Duration { get; set; } // Seconds.
    public short? Price { get; set; } // Pence.

    //[Column(TypeName = "varchar(255)")]
    public string? Preview { get; set; }

    //[Column(TypeName = "varchar(255)")]
    public string? ImageThumb { get; set; } // [todo] Add ImageFull property.

    //[Column(TypeName = "varchar(255)")]
    public string? Structure { get; set; }

    public byte? Rank { get; set; }
    public virtual ICollection<Tag> Tags { get; set; } // 'virtual' makes it lazy load.
}

public class ReadSoundDto
{
    public ReadSoundDto()
    {
        this.Tags = new HashSet<TagSimpleDto>();
    }

    public Guid Id { get; set; }
    public DateTime UploadedOn { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public byte? Duration { get; set; }
    public short? Price { get; set; }
    public string? Preview { get; set; }
    public string? ImageThumb { get; set; }
    public string? Structure { get; set; }
    public byte? Rank { get; set; }
    public virtual ICollection<TagSimpleDto>? Tags { get; set; } // Using this DTO prevents recursion (a Tag has Sounds, which have Tags...)
}

public class ReadSoundsDto
{
    public Guid? Id { get; set; }
    public string? Title { get; set; }
    public short? Price { get; set; }
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
    [Required] public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public byte? Duration { get; set; }
    public short? Price { get; set; }
    public string? Preview { get; set; }
    public string? ImageThumb { get; set; }
    public string? Structure { get; set; }
    public byte? Rank { get; set; }
    public virtual ICollection<short> Tags { get; set; }
}

public class UpdateSoundDto
{
    public UpdateSoundDto()
    {
        this.Tags = new HashSet<short>();
    }

    public Guid Id { get; set; } // After reading https://stackoverflow.com/questions/27900041 I've decided it's best to include the Id in the body.
    public DateTime? UploadedOn { get; set; }
    [Required(ErrorMessage = "Title is required")] public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public byte? Duration { get; set; }
    public short? Price { get; set; }
    public string? Preview { get; set; }
    public string? ImageThumb { get; set; }
    public string? Structure { get; set; }
    public byte? Rank { get; set; }
    public virtual ICollection<short> Tags { get; set; }
}
