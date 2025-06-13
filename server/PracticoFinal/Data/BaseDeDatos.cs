using Microsoft.EntityFrameworkCore;
using PracticoFinal.Models;

namespace PracticoFinal.Data
{
    public class BaseDeDatos : DbContext
    {
        public BaseDeDatos(DbContextOptions options) : base(options) { }

        public DbSet<Models.Moneda> Monedas { get; set; }
        public DbSet<Models.User> Users { get; set; }
        public DbSet<Models.Transaction> Transactions { get; set; }
    }

}
