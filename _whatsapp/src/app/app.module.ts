import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginOptionsPage } from '../pages/login-options/login-options';
import { LoginPhoneNumberPage } from '../pages/login-phone-number/login-phone-number';
import { ResetPhoneNumberPage } from '../pages/reset-phone-number/reset-phone-number';
import { CustomerCreatePage } from '../pages/customer-create/customer-create';
import { MainPage } from '../pages/main/main';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseAuthProvider } from '../providers/auth/firebase-auth';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerHttpProvider } from '../providers/http/customer-http';
import { ChatMessageHttpProvider } from '../providers/http/chat-message-http';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { ChatGroupListComponent } from '../components/chat-group-list/chat-group-list';
import { ChatMessagesPageModule } from '../pages/chat-messages/chat-messages/chat-messages.module';
import { PipesModule } from '../pipes/pipes.module';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { ChatGroupFbProvider } from '../providers/firebase/chat-group-fb';
import { RefreshTokenInterceptor } from '../providers/auth/refresh-token-interceptor';
import { ChatGroupViewerProvider } from '../providers/chat-group-viewer/chat-group-viewer';
import { DirectivesModule } from '../directives/directives.module';
import { StoragePermissionProvider } from '../providers/storage-permission/storage-permission';
import { FirenasePhoneNumberCheckComponent } from '../components/firenase-phone-number-check/firenase-phone-number-check';
import { SelectCountriesCodeComponent } from '../components/select-countries-code/select-countries-code';
import { MoreOptionsComponent } from '../components/more-options/more-options';
import { Diagnostic } from '@ionic-native/diagnostic';
import { RedirectIfNotAuthProvider } from '../providers/redirect-if-not-auth/redirect-if-not-auth';

function jwtFactory(authService: AuthProvider){
    return {
        whitelistedDomains: [   
             new RegExp('localhost:8000/*'), 
             new RegExp('192.168.1.5:8000/*'),
             new RegExp('192.168.1.109:8000/*'),
             new RegExp('10.39.11.179:8000/*')
        ],
        tokenGetter: () => {
            return authService.getToken();
        }
    }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    CustomerCreatePage,
    MainPage,
    ChatGroupListComponent, 
    FirenasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule,
    SuperTabsModule.forRoot(),
    ChatMessagesPageModule,
    PipesModule,
    DirectivesModule,
    JwtModule.forRoot({
        jwtOptionsProvider:{
            provide: JWT_OPTIONS,
            useFactory: jwtFactory,
            deps: [AuthProvider]
        }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    CustomerCreatePage,
    MainPage,
    ChatGroupListComponent,
    FirenasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseAuthProvider,
    AuthProvider,
    CustomerHttpProvider,
    ChatMessageHttpProvider,
    Media,
    File,
    ChatGroupFbProvider,
    ChatGroupViewerProvider,
    StoragePermissionProvider,
    Diagnostic, 
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RefreshTokenInterceptor,
        multi: true
    },
    RedirectIfNotAuthProvider,
  ]
})
export class AppModule {}
