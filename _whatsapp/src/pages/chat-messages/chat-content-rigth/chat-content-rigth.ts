import { Component, Input } from '@angular/core';
import { ChatContentDetailComponent } from '../../../pages/chat-messages/chat-content-detail/chat-content-detail';
import { ChatAvatarComponent } from '../../../pages/chat-messages/chat-avatar/chat-avatar';

/**
 * Generated class for the ChatContentRigthComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-content-rigth',
  templateUrl: 'chat-content-rigth.html'
})
export class ChatContentRigthComponent {

   @Input()
   message;

  constructor() {
    console.log('Hello ChatContentRigthComponent Component');
  }

}
