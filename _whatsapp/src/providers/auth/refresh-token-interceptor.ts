import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { AuthProvider } from './auth';
import { App } from 'ionic-angular';
import { LoginOptionsPage } from '../../pages/login-options/login-options';

export class RefreshTokenInterceptor implements HttpInterceptor{

  constructor(private authService: AuthProvider, private app: App) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
      return next
          .handle(req)
          .pipe(
              tap((event: HttpEvent<any>) => {
                  console.log(event);
                  this.setNewTokenIfResponseValid(event);
              }, (eventError: HttpEvent<any>) => {
                  this.setNewTokenIfResponseValid(eventError);
                  this.redirectToLoginIfUnauthenticated(eventError);
              })
          )
  }
  
  private redirectToLoginIfUnauthenticated(eventError: HttpEvent<any>){
      if(eventError instanceof HttpErrorResponse && eventError.status == 401){
          this.authService.setToken(null);
          this.app.getRootNav().setRoot(LoginOptionsPage);
      }
  }
  
  private setNewTokenIfResponseValid(event: HttpEvent<any>){
      if(event instanceof HttpResponseBase){
          const authorizationHeader = event.headers.get('authorization');
          //console.log(authorizationHeader);
          if(authorizationHeader){
              const token = authorizationHeader.split(' ')[1];
              this.authService.setToken(token);
          }
      }
  }
  
}
