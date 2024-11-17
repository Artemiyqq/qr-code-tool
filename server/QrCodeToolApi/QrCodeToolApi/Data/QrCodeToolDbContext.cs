using Microsoft.EntityFrameworkCore;
using QrCodeToolApi.Models;

namespace QrCodeToolApi.Data
{
    public class QrCodeToolDbContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }

        public QrCodeToolDbContext(DbContextOptions<QrCodeToolDbContext> options) : base(options)
        {
            Accounts = Set<Account>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .HasIndex(a => a.Email)
                .IsUnique();
        }
    }
}