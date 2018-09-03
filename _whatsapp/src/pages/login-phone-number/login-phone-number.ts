import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { AuthProvider } from '../../providers/auth/auth';
import { MainPage } from '../../pages/main/main';
import { CustomerCreatePage } from '../../pages/customer-create/customer-create';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private firebaseAuth: FirebaseAuthProvider,
              private authService: AuthProvider) {
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
      this.firebaseAuth.makePhoneNumberForm("#firebase-ui");
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
          //redirecionar para a criação da conta do cliente
          this.firebaseAuth
              .makePhoneNumberForm("#firebase-ui")
              .then(() => this.handleAuthUser());
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
