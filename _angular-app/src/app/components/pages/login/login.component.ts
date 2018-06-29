import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  credentials = {
     email : 'admin@user.com',
     password: 'secret'
  };
  
//  credenciais = {
//          Authorization : 'Basic ODUyY2YzZTEtYTVmZi00MzNiLWI0NGMtZmYxZjAzMjE0OTU5'
//  };
  
  constructor(private http: HttpClient, private router: Router) { //injeção de dependência automática
      
  }

  ngOnInit() {
      
  }
  
  submit(){
      //Enviar uma requisição ajax com as credenciais para API
      this.http.post<any>('http://localhost:8000/api/login', this.credentials)
               .subscribe((data) => {
                   this.router.navigate(['categories/list']);
                   const token = data.token;
//                   this.http.get('http://localhost:8000/api/categories', {
//                       headers: {
//                           'Authorization' : `Bearer ${token}`
//                       }
//                   }).subscribe((data) => {  console.log(data); });
               });
      
//      this.http.get<any>('https://onesignal.com/api/v1/notifications?app_id=1db65dff-6bbc-4e37-924c-1022209c98df', {headers: this.credenciais})
//               .subscribe((data) => console.log(data));
      
      return false;
  }

}


//JavaScript
//TypeScript wrapper - superset - ES6 - ES7 --------> ES5 - EcmaScript 2014
