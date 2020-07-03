namespace cafeNew.Models
{
    public class DishOrder
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int DishId { get; set; }
        public int OrderId { get; set; }

        public Order Order { get; set; }
        public DishOrder Dish { get; set; }
    }
}