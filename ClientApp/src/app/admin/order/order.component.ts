import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders = [];
  errMess:string;
  constructor(private orderServie: OrderService) { }

  ngOnInit() {
    this.orderServie.getOrders().subscribe(
      orders => this.orders = orders,
      errmess => console.log(errmess)
    );
  }

}
