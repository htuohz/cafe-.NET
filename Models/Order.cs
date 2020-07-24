
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cafeNew.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
        public System.DateTime OrderPlaced { get; set; }
        public System.DateTime? OrderFulfilled { get; set; }
        public string UserId { get; set; }

        public ICollection<DishOrder> DishOrders { get; set; }

    }
}