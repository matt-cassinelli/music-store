using Microsoft.EntityFrameworkCore;

namespace MusicStore.Server.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public virtual DbSet<Sound> Sounds { get; set; } = null!;
    public virtual DbSet<Tag> Tags { get; set; } = null!;

    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) // Override DbContext's OnConfiguring method to add our connection string.
    //{
        //optionsBuilder.EnableSensitiveDataLogging(); // See Id conflicts
        //optionsBuilder.LogTo(Console.WriteLine); // Log SQL queries that EF generates
    //}
}
