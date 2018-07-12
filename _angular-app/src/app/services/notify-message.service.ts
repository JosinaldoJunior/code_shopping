import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';

@Injectable({
  providedIn: 'root'
})

export class NotifyMessageService {

  constructor() { }
  
  success(text: string){
      this.alert(text, Types.success);
  }
  
  error(text: string){
      this.alert(text, Types.error);
  }
  
  info(text: string){
      this.alert(text, Types.info);
  }
  
  notice(text: string){
      this.alert(text, Types.notice);
  }
  
  private alert(text: string, type: Types){
      this.pnotify.alert({text, type});
  }
  
  private get pnotify(){
      PNotifyButtons;
      return PNotify;
  }
  
}

enum Types{
    success = 'success',
    error = 'error',
    info = 'info',
    notice = 'notice'
}
