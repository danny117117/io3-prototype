import {Component} from '@angular/core';
import {NavController, Platform, ActionSheetController, AlertController} from 'ionic-angular';
import {Params_Authenticate} from '../../models/models';
import {DataServiceProvider} from '../../providers/data-service/data-service';
import {basePage} from '../../models/basePage';
import {RegisterPage} from '../register/register';
import {CommonServiceProvider} from '../../providers/common-service/common-service';
//import {PortfolioPage} from '../portfolio/portfolio';
import {Toast} from '@ionic-native/toast';
import {TranslateService} from "@ngx-translate/core";
import {Storage} from '@ionic/storage';
import {Keyboard} from "@ionic-native/keyboard";
import {FirebaseanalyticsPage} from "../firebaseanalytics/firebaseanalytics";
import {Firebase} from "@ionic-native/firebase";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {PortfolioPage} from "../portfolio/portfolio";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends basePage {
    language: string;
    data: Params_Authenticate = new Params_Authenticate();
    user;
    userToken;

    constructor(public navCtrl: NavController,
                private toast: Toast,
                private api: DataServiceProvider,
                private common: CommonServiceProvider,
                public translateService: TranslateService,
                public platform: Platform,
                public actionSheetCtrl: ActionSheetController,
                private storage: Storage,
                Keyboard: Keyboard,
                public firebaseprovider: FirebaseProvider,
                public firebase: Firebase,
                public alertCtrl: AlertController) {
        super();
        Keyboard.disableScroll(true);
        this.data.USER_NAME = 'adib';
        this.data.PASSWORD = '454540@KRMCRHW';
        this.api.DQNewSession().subscribe((data) => {
            this.common.SESSION_ID = data;
        });
        storage.get('language').then((val) => {
            this.translateService.use(val);
            this.common.onLanguageChange(val);
        });
        this.storage.get('gotUserToken').then((val) => {
            this.userToken = val;
            this.firebase.getToken()
                .then((tokenuser) => {
                    if (this.userToken != true) {
                        console.log("-->" + this.userToken);
                        alert(tokenuser);
                        this.firebaseprovider.notRegistered(tokenuser);
                    }
                }).catch((error) => {
                this.firebaseprovider.onToast(error);
            });
        });
    }
    Authenticate() {
        this.user = this.firebaseprovider.login(this.data.USER_NAME, this.data.PASSWORD);
        this.Processing = true;
        this.api.Authenticate(this.data);
        this.api.Authenticate(this.data).subscribe(
            (result) => {
                this.Processing = false;
                if (result.Is_Authentic) {
                    this.navCtrl.push(PortfolioPage);
                }
                else {
                    this.toast.show("Invalid User Name / Password", '2000', 'top').subscribe(() => {
                    });
                }
            });
    }

    ProceedToRegister() {
        //  this.navCtrl.push(RegisterPage);
        const alert = this.alertCtrl.create({
            message: 'Are You Registered ?',
            buttons: [
                {
                    text: 'yes',
                    handler: () => {
                        this.navCtrl.push(RegisterPage);
                    }
                },
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        })
        alert.present();
    }

    presentActionSheet() {
        this.storage.get("UserUID").then((val) => {
            console.log(val)
        });
        let english = this.translateService.instant('english');
        let arabic = this.translateService.instant('arabic');
        let language = this.translateService.instant('language');
        let actionSheet = this.actionSheetCtrl.create({
            title: language,
            buttons: [
                {
                    text: english,
                    handler: () => {
                        //console.log('Destructive clicked');
                        this.common.onLanguageChange("en");
                        this.storage.set('language', 'en');
                    }
                }, {
                    text: arabic,
                    handler: () => {
                        //console.log('Archive clicked');
                        this.common.onLanguageChange("ar");
                        this.storage.set('language', 'ar');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    onLogOut() {
        this.firebaseprovider.logoutUser();
    }

    onFirebase() {
        this.navCtrl.push(FirebaseanalyticsPage)
    }

}
