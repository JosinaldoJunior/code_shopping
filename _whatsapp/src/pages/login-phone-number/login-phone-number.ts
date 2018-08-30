import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { AuthProvider } from '../../providers/auth/auth';
import { MainPage } from '../../pages/main/main';

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

  ionViewDidLoad() {
      const unsubscribed = this.firebaseAuth.firebase.auth().onAuthStateChanged((user) => {
          if(user){
              this.authService
                  .login()
                  .subscribe((token) => {
                      console.log(token);
                      //redirecionar para o main
                      this.redirectToMainPage();
                      console.log('redirecionar para o main');
                  }, (responseError) => {
                      //redirecionar para a criação da conta do cliente
                      this.redirectToCustumerCreatePage();
                      console.log('redirecionar a criação da conta do cliente');
                  });
              unsubscribed(); //Mata a constante
          }
      });
      
      this.firebaseAuth.getToken().then((token) => console.log(token), (error) => console.log(error));
      this.firebaseAuth.makePhoneNumberForm("#firebase-ui");
  }
  
  redirectToMainPage(){
      this.navCtrl.setRoot(MainPage);
  }
  
  redirectToCustumerCreatePage(){
      //this.navCtrl.setRoot(MainPage);
  }

}
