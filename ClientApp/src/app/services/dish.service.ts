import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../shared/dish';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  baseUrl : string;
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService,
    @Inject('BASE_URL') baseUrl: string) { 
      this.baseUrl = baseUrl;
    }

  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(this.baseUrl+'menu/getdishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

  
}
