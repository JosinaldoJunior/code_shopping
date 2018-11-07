import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, flatMap } from 'rxjs/operators';
import { AuthProvider } from './auth';
import { App } from 'ionic-angular';
import { LoginOptionsPage } from '../../pages/login-options/login-options';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor{

  private _jwtInterceptor: JwtInterceptor;
  
  constructor(private authService: AuthProvider, private app: App, private injector: Injector) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
      this.jwtInterceptor;
      if(!this.authService.getToken() || !this.isTokenExpired() || req.url === this.authService.refreshUrl()){
          return this.handleRequest(req, next); 
      }else{
          console.log('tem que renovar o token');
          return this.authService
              .refresh()
              .pipe(
                  flatMap(data => {
                      //return this.handleRequest(req, next); //cilada - recriar rec com token novo
                      const obs = this._jwtInterceptor.intercept(req, next);
                      this.setPipes(obs);
                      return obs;
                  })
              ) 
      }   
              
  }
  
  private isTokenExpired(){
      const token = this.authService.getToken();
      return this.authService.isTokenExpired(token);
  }
  
  private handleRequest(req: HttpRequest<any>, next: HttpHandler){
      const obs = next.handle(req);
      this.setPipes(obs);
      return obs;
  }
  
  private get jwtInterceptor(): JwtInterceptor{
      if(this._jwtInterceptor){
          return this._jwtInterceptor;
      }
      
      const interceptors = this.injector.get(HTTP_INTERCEPTORS);
      
      const index = interceptors.findIndex((interceptor) => interceptor instanceof JwtInterceptor);
      
      this._jwtInterceptor = interceptors[index] as JwtInterceptor;
//      console.log(this._jwtInterceptor);
      return this._jwtInterceptor;
  }
  
  private setPipes(observable: Observable<any>){
      observable.pipe(
          tap((event: HttpEvent<any>) => {
              console.log(event);
              this.setNewTokenIfResponseValid(event);
          }, (eventError: HttpEvent<any>) => {
              this.setNewTokenIfResponseValid(eventError);
              this.redirectToLoginIfUnauthenticated(eventError);
          })
      );
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
