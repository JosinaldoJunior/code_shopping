import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
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
  
  showMessageError = false;
  
//  credenciais = {
//          Authorization : 'Basic ODUyY2YzZTEtYTVmZi00MzNiLWI0NGMtZmYxZjAzMjE0OTU5'
//  };
  
  constructor(private authService: AuthService, private router: Router) { //injeção de dependência automática
      
  }

  ngOnInit() {
      
  }
  
  submit(){
      this.authService.login(this.credentials)
          .subscribe((data) => {
              this.router.navigate(['categories/list']);      
          }, () => this.showMessageError = true);
      
      return false;
  }

}

//JavaScript
//TypeScript wrapper - superset - ES6 - ES7 --------> ES5 - EcmaScript 2014
