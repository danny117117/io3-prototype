import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { DatePicker } from '@ionic-native/date-picker';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { CommonServiceProvider } from '../providers/common-service/common-service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RegisterPage } from '../pages/register/register';
import { PortfolioPage } from '../pages/portfolio/portfolio';
import { Toast } from '@ionic-native/toast';
import { LandingPage } from '../pages/landing/landing';

@NgModule({
  declarations: [
    MyApp,
    LandingPage,
    HomePage,
    RegisterPage,
    PortfolioPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LandingPage,
    HomePage,
    RegisterPage,
    PortfolioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    Keyboard,
    Toast,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider,
    CommonServiceProvider
  ]
})
export class AppModule {}
