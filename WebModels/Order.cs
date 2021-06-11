using System;
using System.Collections.Generic;

namespace cafeNew.WebModels
{
    public class Order
    {
        public ICollection<DishOrder> DishOrders { get; set; }
        public string AddressId { get; set; }
    }
}
