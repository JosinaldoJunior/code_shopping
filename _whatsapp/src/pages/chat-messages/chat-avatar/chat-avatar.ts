import { Component, Input} from '@angular/core';

/**
 * Generated class for the ChatAvatarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-avatar',
  templateUrl: 'chat-avatar.html'
})
export class ChatAvatarComponent {

  @Input()
  position: string;

  constructor() {
  }

}
