import {Component} from '@angular/core';
import {NavController, Platform, ActionSheetController} from 'ionic-angular';
import {Params_Authenticate} from '../../models/models';
import {DataServiceProvider} from '../../providers/data-service/data-service';
import {basePage} from '../../models/basePage';
import {RegisterPage} from '../register/register';
import {CommonServiceProvider} from '../../providers/common-service/common-service';
import {PortfolioPage} from '../portfolio/portfolio';
import {Toast} from '@ionic-native/toast';
import {TranslateService} from "@ngx-translate/core";
import {Storage} from '@ionic/storage';
import {Keyboard} from "@ionic-native/keyboard";
import {FirebaseanalyticsPage} from "../firebaseanalytics/firebaseanalytics";
import {Firebase} from "@ionic-native/firebase";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends basePage {
    language: string;
    data: Params_Authenticate = new Params_Authenticate();

    constructor(public navCtrl: NavController,
                private toast: Toast,
                private api: DataServiceProvider,
                private common: CommonServiceProvider,
                public translateService: TranslateService,
                public platform: Platform,
                public actionSheetCtrl: ActionSheetController,
                private storage: Storage,
                Keyboard: Keyboard,
                private firebase: Firebase) {
        super();



        Keyboard.disableScroll(true);
        this.data.USER_NAME = 'adib';
        this.data.PASSWORD = '454540@KBTFSPA';
        this.api.DQNewSession().subscribe((data) => {
            this.common.SESSION_ID = data;
        })

        storage.get('language').then((val) => {
            this.translateService.use(val);
            this.common.onLanguageChange(val);
        });

    }

    Authenticate() {
        this.Processing = true;
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
        this.navCtrl.push(RegisterPage);
    }

    presentActionSheet() {
        var english = this.translateService.instant('english');
        var arabic = this.translateService.instant('arabic');
        var language = this.translateService.instant('language');
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

    onFirebase() {
        this.navCtrl.push(FirebaseanalyticsPage)
    }
}
