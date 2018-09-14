import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello ChatContentRigthComponent Component');
    this.text = 'Hello World';
  }

}
