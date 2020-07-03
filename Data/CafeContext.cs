using System;
using cafeNew.Models;
using Microsoft.EntityFrameworkCore;

namespace cafeNew.Data
{
    public class CafeContext: DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<DishOrder> DishOrders { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=EFDemoDB;Integrated Security=True;");
        //}

        public CafeContext(DbContextOptions<CafeContext> options) : base(options)
        {

        }
    }
}
