export class Order{
    addressId: number;
    dishOrders: DishOrder[];


}

export interface DishOrder{
    DishId: number;
    Quantity: number;
  }