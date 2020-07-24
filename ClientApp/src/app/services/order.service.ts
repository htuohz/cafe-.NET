import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DishOrder } from '../nav-menu/cart/cart.component';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService{

  baseUrl: string;
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService,
    @Inject('BASE_URL') baseUrl: string) {
      this.baseUrl = baseUrl;
     }
  
  submitOrder(dishOrders: DishOrder[]): Observable<any>{
    return this.http.post<any>(this.baseUrl+'order/PlaceOrder',dishOrders)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

}
