import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(user: {email: string, password: string}) : Observable<{token: string}>{
    //Enviar uma requisição ajax com as credenciais para API
      return this.http.post<{token: string}>('http://localhost:8000/api/login', user);
      
//      this.http.get<any>('https://onesignal.com/api/v1/notifications?app_id=1db65dff-6bbc-4e37-924c-1022209c98df', {headers: this.credenciais})
//               .subscribe((data) => console.log(data));
  }
  
}
