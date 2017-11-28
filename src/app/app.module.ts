import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Keyboard} from '@ionic-native/keyboard';
import {DatePicker} from '@ionic-native/date-picker';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {DataServiceProvider} from '../providers/data-service/data-service';
import {CommonServiceProvider} from '../providers/common-service/common-service';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {RegisterPage} from '../pages/register/register';
import {PortfolioPage} from '../pages/portfolio/portfolio';
import {Toast} from '@ionic-native/toast';
import {LandingPage} from '../pages/landing/landing';
import {TranslateStore} from "@ngx-translate/core/src/translate.store";
import {IonicStorageModule} from '@ionic/storage';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FirebaseanalyticsPage} from "../pages/firebaseanalytics/firebaseanalytics";
import {Firebase} from "@ionic-native/firebase";
import {FirebaseProvider} from '../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const firebaseConfig = {
    apiKey: "AIzaSyDPPNUCQHs602A0x26OtKXg0k-ofQok_3E",
    authDomain: "client-space-mobile.firebaseapp.com",
    databaseURL: "https://client-space-mobile.firebaseio.com",
    projectId: "client-space-mobile",
    storageBucket: "client-space-mobile.appspot.com",
    messagingSenderId: "947181869234"
  };
@NgModule({
    declarations: [
        MyApp,
        LandingPage,
        HomePage,
        RegisterPage,
        PortfolioPage,
        FirebaseanalyticsPage
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        }),
        IonicModule.forRoot(MyApp, {
            scrollPadding: false,
            scrollAssist: true,
            autoFocusAssist: false
        }),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LandingPage,
        HomePage,
        RegisterPage,
        PortfolioPage,
        FirebaseanalyticsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        DatePicker,
        Keyboard,
        Toast,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DataServiceProvider,
        CommonServiceProvider,
        TranslateStore,
        Firebase,
        FirebaseProvider

    ]
})
export class AppModule {
}
