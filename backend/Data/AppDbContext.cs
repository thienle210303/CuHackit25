// using backend.Model;
// using Microsoft.EntityFrameworkCore;

// namespace backend.Data
// {
//     public class AppDbContext : DbContext
//     {
//         public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
//         public DbSet<Event> Events { get; set; }

//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             modelBuilder.Entity<Event>()
//                 .HasKey(e => e.Id); // Primary key for Event table
//         }
//     }
// }
