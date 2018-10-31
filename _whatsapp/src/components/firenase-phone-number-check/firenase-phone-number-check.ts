import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
declare const cordova;

/**
 * Generated class for the FirenasePhoneNumberCheckComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'firenase-phone-number-check',
  templateUrl: 'firenase-phone-number-check.html'
})
export class FirenasePhoneNumberCheckComponent {

  countryCode = "55";
  phoneNumber = '';
  verificationId = '';

  constructor(private platform: Platform,
              private toastCtrl: ToastController) {
  }
  
  verififyPhoneNumber(){
      this.platform.ready().then(() => {
          cordova.plugins.firebase.auth.verifyPhoneNumber(this.fullPhoneNumber, 30000)
              .then(
                      verificationId => this.verificationId = verificationId,
                      error => {
                          console.log(error);
                          this.showToast('Não foi possível verificar o telefone.')
                      }
              )
      })    
  }
  
  showToast(message){
      const toast = this.toastCtrl.create({
          message, duration: 3000
      });
      
      toast.present();
  }
  
  cancel(){
      this.verificationId = '';
  }
  
  get fullPhoneNumber(){
      const countryCode = this.countryCode.replace(/[^0-9]/g, '');
      return `+${countryCode}${this.phoneNumber}`;
  }

}
