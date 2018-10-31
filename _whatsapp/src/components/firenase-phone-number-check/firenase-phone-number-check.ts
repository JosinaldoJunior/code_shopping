import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
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
  verificationId = '';

  constructor(private platform: Platform) {
  }
  
  verififyPhoneNumber(){
      this.platform.ready().then(() => {
          cordova.plugins.firebase.auth.verifyPhoneNumber('+16505551234', 30000)
              .then(
                      verificationId => console.log(verificationId),
                      error => console.log(error)
              )
      })    
  }
  
  cancel(){
      this.verificationId = '';
  }

}
