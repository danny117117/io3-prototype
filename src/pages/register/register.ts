import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, Platform} from 'ionic-angular';
import {DatePicker} from '@ionic-native/date-picker';
import {RegisterInfo, Params_GetSignup, Codes} from '../../models/models';
import {DatePipe} from '@angular/common';
import {basePage} from '../../models/basePage';
import {DataServiceProvider} from '../../providers/data-service/data-service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Storage} from '@ionic/storage';
import {TranslateService} from "@ngx-translate/core";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {Toast} from "@ionic-native/toast";

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage extends basePage {
    register: FormGroup;
    products: Codes[] = [];
    registerInfo: RegisterInfo = new RegisterInfo();
    isMobile = true;
    isMail = true;

    constructor(public navCtrl: NavController,
                private api: DataServiceProvider,
                public formBuilder: FormBuilder, public navParams: NavParams,
                private datePicker: DatePicker,
                private storage: Storage,
                public translateService: TranslateService,
                private common: CommonServiceProvider,
                public dataservices: DataServiceProvider,
                public alertCtrl: AlertController,
                private toast: Toast) {
        super();
        this.registerInfo.WEB_USER_ID = "12341234";
        this.registerInfo.PRODUCT_CODE = "SHP";
        this.registerInfo.POLICY_NBR = "2634";
        this.registerInfo.EXPIRY_DATE = "14/12/2056";
        this.registerInfo.PIN = 897;
        this.registerInfo.MOBILE = "03172765";
        this.registerInfo.EMAIL = "danny_nader@hotmail.com";


        storage.get('language').then((val) => {
            this.translateService.use(val);
            this.common.onLanguageChange(val);
        });

        //POLICY_NBR: ["", Validators.compose([Validators.required, Validators.pattern('([a-zA-Z]{3,3})(\\/)([0-9]{6,14})')])],
        this.GetSignup();
        this.register = this.formBuilder.group({
            WEB_USER_ID: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(16)])],
            PRODUCT_CODE: "",
            POLICY_NBR: [""],
            PIN: "",
            EMAIL: ["", Validators.pattern('^[_a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$')],
            MOBILE: []
        });
        //Listen to email value and update validators of phoneNumber accordingly
        this.register.get('EMAIL').valueChanges.subscribe(
            (data) => {
                this.onEmailValueChanged(data)

            }
        );
    }

    onEmailValueChanged(value: any) {
        let phoneNumberControl = this.register.get('MOBILE');

        // Using setValidators to add and remove validators. No better support for adding and removing validators to controller atm.
        // See issue: https://github.com/angular/angular/issues/10567
        if (!value) {
            phoneNumberControl.setValidators([Validators.required]);
        } else {
            phoneNumberControl.setValidators([Validators.minLength(0)]);
        }
        phoneNumberControl.updateValueAndValidity(); //Need to call this to trigger a update


    }

    GetSignup() {
        let param = new Params_GetSignup();
        this.api.GetSignup(param).subscribe((data) => {
            this.products = data.filter(x => x.Tbl_Name == '_WebProducts');
        });
    }

    CancelHandler() {
        this.navCtrl.pop();
    }

    selectExpiryDate() {
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
            date => {
                this.registerInfo.EXPIRY_DATE = this.FormatDate(date);
            },
            err => alert(err)
        );
    }

    onRegister() {
        this.dataservices.registerInfo(this.registerInfo).subscribe((data) => {
            if (data.res == "validate") {

                this.toast.show(`There is  Policy Found`, '5000', 'top').subscribe(
                    toast => {
                        this.navCtrl.pop();
                    }
                );
            }
            else {
                const alert = this.alertCtrl.create({
                    title: "Invalidate",
                    subTitle: "There is no Policy Found",
                    buttons: [
                        {
                            text: "Ok"
                        }
                    ]
                })
                alert.present();
            }

        }, (err) => {
            alert("Something Want Wrong")
        });

    }
}
