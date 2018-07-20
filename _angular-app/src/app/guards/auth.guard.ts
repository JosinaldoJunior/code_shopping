import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    
  constructor(private authService: AuthService, private router: Router){
      
  }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.authService.isAuth();
    this.redirectIfUnauthenticated(isAuth);
    return isAuth;
  }
  
  private redirectIfUnauthenticated(isAuth: boolean){
      if(!isAuth){
          this.router.navigate(['login']);
      }
}
