import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatGroup, Role, ChatMessage, User } from '../../app/model';
import { FirebaseAuthProvider } from '../auth/firebase-auth';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the ChatGroupFbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatMessageFb {

  database;
  
  constructor(private firebaseAuth: FirebaseAuthProvider,
              private auth: AuthProvider) {
              
      this.database = this.firebaseAuth.firebase.database();
  }
  
  latest(group: ChatGroup, limit: number) : Observable<{key: string, value: ChatMessage}[]>{
      return Observable.create((observer) => {
          this.database.ref(`chat_groups_messages/${group.id}/messages`)
                       .orderByKey()
                       .limitToLast(limit)
                       .once('value', (data) => {
              const messages = [];
              data.forEach((child) => {
                  const message = child.val() as ChatMessage;
                  message.user$ = this.getUser(message.user_id);
                  messages.push({key: child.key, value: message});
              });
              
              observer.next(messages);
          }, (error) => console.log(error));
      })
  }
  
  oldest(group: ChatGroup, limit: number, messageKey: string) : Observable<{key: string, value: ChatMessage}[]>{
      return Observable.create((observer) => {
          this.database.ref(`chat_groups_messages/${group.id}/messages`)
                       .orderByKey()
                       .limitToLast(limit + 1)
                       .endAt(messageKey)
                       .once('value', (data) => {
              const messages = [];
              data.forEach((child) => {
                  const message = child.val() as ChatMessage;
                  message.user$ = this.getUser(message.user_id);
                  messages.push({key: child.key, value: message});
              });
              messages.splice(-1,1);
              observer.next(messages);
          }, (error) => console.log(error));
      })
  }
  
  onAdded(group: ChatGroup) : Observable<{key: string, value: ChatMessage}> {
      return Observable.create((observer) => {
          this.database.ref(`chat_groups_messages/${group.id}/messages`)
                       .orderByChild('created_at')
                       .startAt(Date.now())
                       .on('child_added', (data) => {
                   const message = data.val() as ChatMessage;
                   message.user$ = this.getUser(message.user_id);
                   observer.next({key: data.key, value: message});
          }, (error) => console.log(error));
      })
  }
  
  
//  onChanged() : Observable<ChatGroup> {
//      return Observable.create((observer) => {
//          this.database.ref('chat_groups')
//                       .on('child_changed', (data) => {
//              const group = data.val() as ChatGroup;
//              group.is_member = this.getMember(group);
//              group.last_message = this.getLastMessage(group);
//              
//              observer.next(group);
//          }, (error) => console.log(error));
//      })
//  }
  
  private getUser(userId: string) : Observable<{name: string, photo_url: string}>{
      return Observable.create(observer => {
          this.database
              .ref(`users/${userId}`)
              .once('value', (data) => {
                  const user = data.val();
                  observer.next(user);
              });
      })
  }

}
