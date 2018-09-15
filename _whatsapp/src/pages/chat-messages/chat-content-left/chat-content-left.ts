import { Component, Input } from '@angular/core';
import { ChatContentDetailComponent } from '../../../pages/chat-messages/chat-content-detail/chat-content-detail';
import { ChatAvatarComponent } from '../../../pages/chat-messages/chat-avatar/chat-avatar';

/**
 * Generated class for the ChatContentLeftComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-content-left',
  templateUrl: 'chat-content-left.html'
})
export class ChatContentLeftComponent {

  @Input()
  message;

  constructor() {
    console.log('Hello ChatContentLeftComponent Component');
  }

}
