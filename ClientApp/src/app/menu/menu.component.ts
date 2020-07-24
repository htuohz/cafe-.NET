import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  constructor(private dishService: DishService,
    @Inject('BASE_URL') baseUrl: string,
    private cartService: CartService) { }

  dishes:Dish[];
  errMess: string;

  selectedDish: Dish;
  ngOnInit() {
     this.dishService.getDishes()
    .subscribe((dishes) => {
      this.dishes = dishes;
      console.log(this.dishes);
    },
      errmess => this.errMess = <any>errmess);
  }
  addItemToCart(dish){
    this.cartService.AddItem(dish);
  }


}
