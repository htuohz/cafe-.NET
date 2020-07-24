import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: DishItem[]=[];
  constructor() {
   }

  AddItem(dish:Dish){
    if(this.items.length==0)
    {
      this.items.push(new DishItem(dish,1));
      this.items.map((item)=>{
        item.total = item.dish.price*item.count;
      });
      return;
      //this.items[0].total = dish.Price;
    }
    else
    {
      for(var i=0;i<this.items.length;i++)
      {
        
        if(this.items[i].dish == dish)
        {
          this.items[i].count = this.items[i].count + 1;
          this.items[i].total = this.items[i].dish.price * this.items[i].count;
          this.items.map((item)=>{
            item.total = item.dish.price*item.count;
          });
          return;
        } 
        
      }

    }
    this.items.push(new DishItem(dish,1));
    this.items.map((item)=>{
      item.total = item.dish.price*item.count;
    });
      //this.items[this.items.length-1].total = this.items[this.items.length-1].dish.Price * this.items[this.items.length-1].count;
    }
  
  ExtractItem(i){
    this.items[i].count--;
    if(this.items[i].count<1)
    {
      this.items.splice(i,1);      
    }
    else
    {
      //this.items[i].total = this.items[i].dish.Price * this.items[i].count;
    }
    // this.getTotalSum();
    // this.eventsSubject.next();
    this.items.map((item)=>{
      item.total = item.dish.price*item.count;
    });
  }  

  RemoveItem(i){
    if(this.items[i]!=null){
      this.items.splice(i,1);     
    }
    this.items.map((item)=>{
      item.total = item.dish.price*item.count;
    });
  }

  

  getItems(): Observable<DishItem[]>{

    let observable = Observable.create(observer => observer.next(this.items));
    console.log(this.items);
    return observable;
  }
  

}
export class DishItem {
  dish: Dish;
  count: number;
  total: number;

  

constructor(_dish: Dish, _count: number) {
  this.dish = _dish;
  this.count = _count;
  
}
}
