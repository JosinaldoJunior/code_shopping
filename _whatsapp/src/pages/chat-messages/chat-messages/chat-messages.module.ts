import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMessagesPage } from './chat-messages';
import { ChatAvatarComponent } from '../chat-avatar/chat-avatar';
import { ChatContentLeftComponent } from '../chat-content-left/chat-content-left';
import { ChatContentRigthComponent } from '../chat-content-rigth/chat-content-rigth';
import { ChatFooterComponent } from '../chat-footer/chat-footer';

@NgModule({
  declarations: [
    ChatMessagesPage,
    ChatAvatarComponent,
    ChatContentLeftComponent,
    ChatContentRigthComponent,
    ChatFooterComponent
  ],
  imports: [
    IonicPageModule.forChild(ChatMessagesPage),
  ],
})
export class ChatMessagesPageModule {}
