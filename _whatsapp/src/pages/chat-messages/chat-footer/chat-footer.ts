import { Component, ViewChild} from '@angular/core';
import { ItemSliding, TextInput } from 'ionic-angular';
import { ChatMessageHttpProvider } from '../../../providers/http/chat-message-http';
import { AudioRecorderProvider } from '../../../providers/audio-recorder/audio-recorder';
import Timer from 'easytimer.js/dist/easytimer.min';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

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
  timer = new Timer();
  recording = false;
  sending = false;
  
  @ViewChild('inputFileImage')
  inputFileImage: TextInput;
  
  @ViewChild('itemSliding')
  itemSliding: ItemSliding;
  
  subjectReleaseAudioButton = new Subject();

  constructor(private chatMessageHttp: ChatMessageHttpProvider,
              private audioRecorder: AudioRecorderProvider) {
  }
  
  ngOnInit(){
      this.onStopRecord();
  }
  
  onDrag(){
//      console.log(this.itemSliding.getSlidingPercent()); 
      if(this.itemSliding.getSlidingPercent() > 0.9){
          this.itemSliding.close();
          this.audioRecorder.stopRecord()
          .then(
                  (blob) => console.log('stop recording'),
                   error => console.log(error)
           );
      }
  }
  
  onStopRecord(){
      this.subjectReleaseAudioButton
          .pipe(
              debounceTime(500)
          )
          .subscribe(() => {
              if(!this.recording){
                  return;
              }
              
              if(this.itemSliding.getSlidingPercent() === 0){
                  this.clearRecording();
                  this.audioRecorder.stopRecord()
                                    .then(
                                            (blob) => this.sendMessageAudio(blob),
                                            error => console.log(error)
                                     );
              }
          })
  }
  
  clearRecording(){
      this.timer.stop();
      this.text = '';
      this.recording = false;
  }
  
  holdAudioButton(){
      this.recording = true;
      this.audioRecorder.startRecorder();
      
      this.timer.start({precision: 'seconds'});
      this.timer.addEventListener('secondsUpdated', (e) => {
          const time = this.getMinutesSeconds();
          this.text = `${time} Gravando...`;
      });
//      console.log('pressionando o dedo no botao');
  }
  
  private getMinutesSeconds(){
      return this.timer.getTimeValues().toString().substring(3);
  }
  
  releaseAudioButton(){
      this.subjectReleaseAudioButton.next();
//      console.log('tirou o dedo do botao');
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
  
  sendMessageAudio(blob: Blob){
      this.sendMessage({content: blob, type: 'audio'})
  }
  
  sendMessage(data: {content, type}){
      this.sending = true;
      this.chatMessageHttp.create(1, data)
          .subscribe(() => {
              this.sending = false;
              if(data.type === 'text'){
                  this.text = '';
              }
              console.log('enviou');
          }, (error) => {
              this.sending = false;
          });
  }
  
  selectImage(){
      const nativeElement = this.inputFileImage.getElementRef().nativeElement;
      const inputFile = nativeElement.querySelector('input');
      inputFile.click();
  }
  
  getIconSendMessage(){
      if(this.messageType === 'text'){
          return this.text === '' ? 'mic' : 'send';
      }
      
      return 'mic';
  }
  
}
