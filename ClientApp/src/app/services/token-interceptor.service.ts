import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor
 {

  constructor() { }
  intercept(req,next){
    var token = "";
    token = localStorage.getItem('token');
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: token
      }
    })
    return next.handle(tokenizedReq);
  }
}
