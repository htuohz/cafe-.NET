using cafeNew.Models;
using Microsoft.EntityFrameworkCore;
using MySql.Data.Entity;


namespace cafeNew.Data
{
    [System.Data.Entity.DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class CafeContext: DbContext
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<DishOrder> DishOrders { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }

        public CafeContext(DbContextOptions<CafeContext> options) : base(options)
        {

        }


    }
}
