import { Component, ViewChild} from '@angular/core';
import { TextInput } from 'ionic-angular';
import { ChatMessageHttpProvider } from '../../../providers/http/chat-message-http';

/**
 * Generated class for the ChatFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-footer',
  templateUrl: 'chat-footer.html'
})
export class ChatFooterComponent {

  text: string = '';
  messageType  = 'text';
  
  @ViewChild('inputFileImage')
  inputFileImage: TextInput;

  constructor(private chatMessageHttp: ChatMessageHttpProvider) {

  }
  
  sendMessageText(){
      this.sendMessage({content: this.text, type: 'text'});
  }
  
  sendMessageImage(files: FileList){
      if(!files.length){
          return;
      }
      
      this.sendMessage({content: files[0], type: 'image'});
  }
  
  sendMessage(data: {content, type}){
      this.chatMessageHttp.create(1, data)
          .subscribe(() => {
              console.log('enviou');
          });
  }
  
  selectImage(){
      const nativeElement = this.inputFileImage.getElementRef().nativeElement;
      const inputFile = nativeElement.querySelector('input');
      inputFile.click();
  }
  
}
