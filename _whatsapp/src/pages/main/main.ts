import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ChatGroupListComponent } from '../../components/chat-group-list/chat-group-list';
import { MoreOptionsComponent } from '../../components/more-options/more-options';
import { AudioRecorderProvider } from '../../providers/audio-recorder/audio-recorder';
import { RedirectIfNotAuthProvider } from '../../providers/redirect-if-not-auth/redirect-if-not-auth';
import { PushNotificationProvider } from '../../providers/push-notification/push-notification';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  chatGroupList = ChatGroupListComponent;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private audioRecorder: AudioRecorderProvider,
              private redirectIfNotAuth: RedirectIfNotAuthProvider,
              private popover: PopoverController,
              private pushNotification: PushNotificationProvider) {
  } 
  
  ionViewCanEnter(){
      return this.redirectIfNotAuth.ionViewCanEnter()
  }

  ionViewDidLoad() {
      this.pushNotification.registerToken();
      const hasPermissionToRecorder = this.audioRecorder.hasPermission;
      this.audioRecorder.requestPermission()
          .then((result) => {
              console.log('permissao para gravacao', result);
              if(result && !hasPermissionToRecorder){
                  this.audioRecorder.showAlertToCloseApp();
              }
          });
  }
  
  presentMoreOptions(event){
      const popover = this.popover.create(MoreOptionsComponent);
      
      popover.present({
          ev: event
      })
  }

}
