import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { ChatContentLeftComponent } from '../../../pages/chat-messages/chat-content-left/chat-content-left';
import { ChatContentRigthComponent } from '../../../pages/chat-messages/chat-content-rigth/chat-content-rigth';
import { ChatFooterComponent } from '../../../pages/chat-messages/chat-footer/chat-footer';
import { ChatMessageFb } from '../../../providers/firebase/chat-message-fb';
import { ChatMessage, ChatGroup } from '../../../app/model';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ChatMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-messages',
  templateUrl: 'chat-messages.html',
})
export class ChatMessagesPage {

  chatGroup: ChatGroup;
  messages: {key: string, value: ChatMessage}[] = [];
  limit = 20;
  canMoreMessages = true;
  showContent = false;
  
  @ViewChild(Content)
  content: Content;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private chatMessageFb: ChatMessageFb) {
      this.chatGroup = this.navParams.get('chat_group');
  }

  ionViewDidLoad() {
      this.chatMessageFb
              .latest(this.chatGroup, this.limit)
              .subscribe((messages) =>{
                  this.messages = messages;
                  setTimeout(() => {
                      this.content.scrollToBottom(0);
                      this.showContent = true;
                  }, 600);
              });
      
//      const database = this.firebaseAuth.firebase.database();
//      database.ref(`chat_groups_messages/${this.chatGroup.id}/messages`).on('child_added', (data) => {
//          const message = data.val();
//          message.user = Observable.create((observer) => {
//              database.ref(`users/${message.user_id}`).on('value', (data) => {
//                  const user = data.val();
//                  observer.next(user);
//              });
//          });
////          message.user = new Promise((resolve) => {
////              database.ref(`users/${message.user_id}`).on('value', (data) => {
////                  //message.user = data.val();
////                  const user = data.val();
////                  resolve(user);
//////                  console.log(message);
////              });
////          });
//          this.messages.push(message);
//      });
//      
  }
  
  doInfinite(infiniteScroll: InfiniteScroll){
      this.chatMessageFb
            .oldest(this.chatGroup, this.limit, this.messages[0].key)
            .subscribe((messages) => {
                if(!messages.length){
                    this.canMoreMessages = false;
                }
                this.messages.unshift(...messages);
                infiniteScroll.complete();
            }, () => infiniteScroll.complete());
  }

}
