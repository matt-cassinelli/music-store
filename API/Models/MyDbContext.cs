using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
namespace API.Models;

public class MyDbContext : DbContext // EF uses this class to access the database & perform migrations.
{
    public virtual DbSet<Sound> Sounds { get; set; } = null!;
    public virtual DbSet<Tag> Tags { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) // Override DbContext's OnConfiguring method to add our connection string.
    {
        optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=SoundStore;Integrated Security=true");
        // TODO: Move this out of the source code. https://docs.microsoft.com/en-gb/ef/core/miscellaneous/connection-strings
    }
}