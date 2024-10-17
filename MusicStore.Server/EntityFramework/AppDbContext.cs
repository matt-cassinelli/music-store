using Microsoft.EntityFrameworkCore;
using MusicStore.Server.Models;

namespace MusicStore.Server.EntityFramework;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public virtual DbSet<Sound> Sounds { get; set; } = null!;
    public virtual DbSet<Tag> Tags { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Sound>(eb => {
            eb.Property(s => s.UploadedOn).HasPrecision(0);
            eb.Property(s => s.Title).HasMaxLength(255);
            eb.Property(s => s.Description).HasMaxLength(4000);
            eb.Property(s => s.PreviewUrl).HasMaxLength(255);
            eb.Property(s => s.ImageUrl).HasMaxLength(255);
            eb.Property(s => s.Structure).HasMaxLength(255);
        });

        modelBuilder.Entity<Tag>(eb => {
            eb.Property(t => t.CreatedOn).HasPrecision(0);
            eb.Property(t => t.Name).HasMaxLength(255);
        });
    }

    //optionsBuilder.EnableSensitiveDataLogging(); // See Id conflicts
    //optionsBuilder.LogTo(Console.WriteLine); // Log SQL queries that EF generates
}
