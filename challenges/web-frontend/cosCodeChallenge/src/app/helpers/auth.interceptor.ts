import { Injectable } from '@angular/core';import {
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';


import { TokenStorageService } from '../services/token-storage.service'
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = "authtoken"
const USER_ID_HEADER_KEY = "userid"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const userId = this.token.getUserId();
    const token = this.token.getToken();
    if (token != null && userId!=null) {
      console.log("sdfk")
      authReq = req.clone({
        setHeaders: {
          "authtoken":token,
          "userid":userId
        }
    });
    }
    return next.handle(authReq);
  }
}
