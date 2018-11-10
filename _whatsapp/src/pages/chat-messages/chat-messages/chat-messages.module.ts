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
import { PipesModule } from '../../../pipes/pipes.module';
import { LongPressModule } from 'ionic-long-press';
import { AudioRecorderProvider } from '../../../providers/audio-recorder/audio-recorder';
import { ChatMessageFb } from '../../../providers/firebase/chat-message-fb';
import { RedirectIfNotAuthProvider } from '../../../providers/redirect-if-not-auth/redirect-if-not-auth';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@NgModule({
  declarations: [
    ChatMessagesPage,
    ChatAvatarComponent,
    ChatContentLeftComponent,
    ChatContentRigthComponent,
    ChatFooterComponent,
    ChatContentDetailComponent,
  ],
  imports: [
    IonicPageModule.forChild(ChatMessagesPage),
    MomentModule,
    PipesModule,
    LongPressModule
  ],
  providers: [
    AudioRecorderProvider,
    ChatMessageFb,
    PhotoViewer,
    RedirectIfNotAuthProvider
  ]
})

export class ChatMessagesPageModule {}
