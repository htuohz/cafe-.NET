
using System.Collections.Generic;


namespace cafeNew.Models
{
    public class Order
    {
        public int Id { get; set; }
        public System.DateTime OrderPlaced { get; set; }
        public System.DateTime? OrderFulfilled { get; set; }
        public int UserId { get; set; }

        public ICollection<DishOrder> DishOrders { get; set; }

    }
}