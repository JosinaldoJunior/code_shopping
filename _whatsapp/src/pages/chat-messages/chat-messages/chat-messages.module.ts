import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMessagesPage } from './chat-messages';
import { ChatAvatarComponent } from '../chat-avatar/chat-avatar';
import { ChatContentLeftComponent } from '../chat-content-left/chat-content-left';
import { ChatContentRigthComponent } from '../chat-content-rigth/chat-content-rigth';
import { ChatFooterComponent } from '../chat-footer/chat-footer';
import { ChatContentDetailComponent } from '../chat-content-detail/chat-content-detail';
import { MomentModule } from 'ngx-moment';
import { Moment } from 'moment';
import { IsCurrentUserPipe } from '../../../pipes/is-current-user/is-current-user';

@NgModule({
  declarations: [
    ChatMessagesPage,
    ChatAvatarComponent,
    ChatContentLeftComponent,
    ChatContentRigthComponent,
    ChatFooterComponent,
    ChatContentDetailComponent,
    IsCurrentUserPipe
  ],
  imports: [
    IonicPageModule.forChild(ChatMessagesPage),
    MomentModule,
  ],
})
export class ChatMessagesPageModule {}
