import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatGroupListComponent } from '../../components/chat-group-list/chat-group-list';
import { AudioRecorderProvider } from '../../providers/audio-recorder/audio-recorder';

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
              private audioRecorder: AudioRecorderProvider) {
  } 

  ionViewDidLoad() {
      const hasPermissionToRecorder = this.audioRecorder.hasPermission;
      this.audioRecorder.requestPermission()
          .then((result) => {
              console.log('permissao para gravacao', result);
              if(result && !hasPermissionToRecorder){
                  this.audioRecorder.showAlertToCloseApp();
              }
          });
  }

}
