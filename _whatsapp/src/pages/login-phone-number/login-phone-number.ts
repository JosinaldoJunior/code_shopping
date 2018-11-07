import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { AuthProvider } from '../../providers/auth/auth';
import { MainPage } from '../../pages/main/main';
import { CustomerCreatePage } from '../../pages/customer-create/customer-create';
import { FirenasePhoneNumberCheckComponent } from '../../components/firenase-phone-number-check/firenase-phone-number-check';
import { environment } from '@app/env';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the LoginPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-phone-number',
  templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

  showFirebaseUI =  environment.showFirebaseUI;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private firebaseAuth: FirebaseAuthProvider,
              private authService: AuthProvider,
              private http: HttpClient) {  
      
      this.http.get(`${environment.api.url}/products`, {}).subscribe(() => {});
  }
  
  
  // algo inicial para que se o usuario estiver autenticado, ja vai para o main page
  // carregar o firebaseUI Form
  // tiver autenticado, redireciona pro main page ou para o custumer
  // se voltar para a pagina carewgar novamente o firebase ui-form ???

  ionViewDidLoad() {
      const unsubscribed = this.firebaseAuth.firebase.auth().onAuthStateChanged((user) => {
          if(user){
              this.handleAuthUser();
              unsubscribed(); //Mata a constante
          }
      });
      this.firebaseAuth.getToken().then((token) => console.log(token), (error) => console.log(error));
      
      if(environment.showFirebaseUI){
          this.firebaseAuth.makePhoneNumberForm("#firebase-ui"); 
      }
  }
  
  handleAuthUser(){
      this.authService
      .login()
      .subscribe((token) => {
          console.log(token);
          //redirecionar para o main
          this.redirectToMainPage();
          console.log('redirecionar para o main');
      }, (responseError) => {
          if(environment.showFirebaseUI){
              this.firebaseAuth
                  .makePhoneNumberForm("#firebase-ui")
                  .then(() => this.handleAuthUser());
          }
          //redirecionar para a criação da conta do cliente
          this.redirectToCustumerCreatePage();
          console.log('redirecionar a criação da conta do cliente');
      });
  }
  
  redirectToMainPage(){
      this.navCtrl.setRoot(MainPage);
  }
  
  redirectToCustumerCreatePage(){
      this.navCtrl.push(CustomerCreatePage);
  }

}
