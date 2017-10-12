import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Keyboard} from '@ionic-native/keyboard';
import {DatePicker} from '@ionic-native/date-picker';
import {Push, PushObject, PushOptions} from '@ionic-native/push';
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
//import {TranslateService} from "ng2-translate";

import {IonicStorageModule} from '@ionic/storage';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FirebaseanalyticsPage} from "../pages/firebaseanalytics/firebaseanalytics";
//import {Firebase} from "@ionic-native/firebase";
//import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";
import {Firebase} from "@ionic-native/firebase";
import {FirebaseProvider} from '../providers/firebase/firebase';


export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


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
        })
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
        Push,
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
