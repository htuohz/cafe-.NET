import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DishOrder, Order } from '../shared/order';
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

  submitOrder(order: Order): Observable<any>{
    return this.http.post<any>(this.baseUrl+'order/PlaceOrder',order)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getOrders(): Observable<any>{
    return this.http.get<any>(this.baseUrl+'order')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
