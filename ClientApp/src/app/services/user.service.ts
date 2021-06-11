import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';
import { User } from '../shared/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  tokenValue = new BehaviorSubject(this.token);
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
    set token(value){
      this.tokenValue.next(value);
      localStorage.setItem('token',value);
    }
    get token(){
      return localStorage.getItem('token');
    }

    Signin(formData): Observable<any>{
      return this.http.post<any>(this.baseUrl+'user/signin',formData)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getToken():Observable<any>{
      return new Observable((observer)=>{
        observer.next(localStorage.getItem('token'));
      })
    }

}
