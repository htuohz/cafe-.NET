import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  private baseUrl: string;
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService,
    @Inject('BASE_URL') baseUrl: string) { 
      this.baseUrl = baseUrl;
    }

    Register(user: User): Observable<any>{
      return this.http.post<any>(this.baseUrl+'user/register',user)
        .pipe(catchError(this.processHTTPMsgService.handleError));
      
    }
}
