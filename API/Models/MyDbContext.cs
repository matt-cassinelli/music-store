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
        // TODO: Move this out of the source code e.g. "options.UseSqlServer(Configuration.GetConnectionString("MyProjectName"));" https://go.microsoft.com/fwlink/?linkid=2131148 http://go.microsoft.com/fwlink/?LinkId=723263
        optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=SoundStore;Trusted_Connection=True;");
    }
}