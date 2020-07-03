import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dish } from 'src/app/shared/dish';
import { CartService, DishItem } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';



@Component({
  selector: './cart.component',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  dishItems: DishItem[] = [];
  totalSum: number;
  subscription: Subscription;
  
  constructor(private cartService: CartService) { 
    this.subscription = this.cartService.getItems().subscribe((items)=>{
      this.dishItems = items;
      this.updateSum();
   })
  }

  ngOnInit() {

  }
  addItemToCart(dish){
    this.cartService.AddItem(dish);
    this.updateSum();
  }
  extractFromCart(i){
    this.cartService.ExtractItem(i);
    this.updateSum();
  }
  removeFromCart(i){
    this.cartService.RemoveItem(i);
    this.updateSum();
  }

  updateSum(){
    this.totalSum = this.dishItems.reduce<number>((a,b)=>{
      return a+b.total;
    },0)
  }
}



