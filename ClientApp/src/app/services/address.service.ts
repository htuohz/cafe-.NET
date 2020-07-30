import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl: string;
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService,
    @Inject('BASE_URL') baseUrl: string) {
      this.baseUrl = baseUrl;
     }

  GetAdresses(): Observable<any>{
      return this.http.get<any>(this.baseUrl+'address/GetAddress')
        .pipe(catchError(this.processHTTPMsgService.handleError));
      
    }

    AddAdress(address): Observable<any>{
      return this.http.post<any>(this.baseUrl+'address/AddAddress',address)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

}
