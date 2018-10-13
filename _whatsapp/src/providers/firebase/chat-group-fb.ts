import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatGroup } from '../../app/model';
import { FirebaseAuthProvider } from '../auth/firebase-auth';

/*
  Generated class for the ChatGroupFbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatGroupFbProvider {

  database;
  
  constructor(private firebaseAuth: FirebaseAuthProvider) {
    this.database = this.firebaseAuth.firebase.database();
  }
  
  list() : Observable<ChatGroup[]> {
      return Observable.create((observer) => {
          this.database.ref('chat_groups').once('value', (data) => {
              const groupsRaw = data.val() as Array<ChatGroup>;
              const groupsKeys = Object.keys(groupsRaw);
              const groups = [];
              
              for(const key of groupsKeys){
                  groups.push(groupsRaw[key]);
              }
              
              observer.next(groups);
          }, (error) => console.log(error));
      })
  }

}
