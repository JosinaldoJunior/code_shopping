import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, ToastController} from 'ionic-angular';
import { FormBuilder, Validators, FormControl} from '@angular/forms';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { CustomerHttpProvider } from '../../providers/http/customer-http';
import { LoginOptionsPage } from '../../pages/login-options/login-options';

/**
 * Generated class for the ResetPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-phone-number',
  templateUrl: 'reset-phone-number.html',
})
export class ResetPhoneNumberPage {
    
  email = new FormControl('', [Validators.required, Validators.email]);
  canShowFirebaseUI = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private firebaseAuth: FirebaseAuthProvider,
              private customerHttp: CustomerHttpProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPhoneNumberPage');
  }
  
  showFirebaseUI(){
      this.canShowFirebaseUI = true;
      this.handleUpdate();
  }
  
  handleUpdate(){
      this.firebaseAuth
          .makePhoneNumberForm('#firebase-ui')
          .then(() => {
              const email = this.email.value;
              this.customerHttp
                  .requestUpdatePhoneNumber(email)
                  .subscribe(
                      () => {
                      const alert = this.alertCtrl.create({
                          title: 'Alerta',
                          subTitle: `
                          Um e-mail com a validação da mudança foi enviado.
                          Valide-o para logar com o novo telefone`,
                          buttons: [
                            {
                                text: 'Ok',
                                handler: () => {
                                    this.navCtrl.setRoot(LoginOptionsPage);
                                }
                            }
                          ]
                      });
                      alert.present();
                  }, () => {
                      const toast = this.toastCtrl.create({
                          message: 'Não foi possível requisitar a alteração do telefone',
                          duration: 3000
                      });
                      toast.present();
                      this.handleUpdate();
                  });
          });
  }

}
