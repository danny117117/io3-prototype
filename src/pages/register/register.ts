import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {DatePicker} from '@ionic-native/date-picker';
import {RegisterInfo, Params_GetSignup, Codes} from '../../models/models';
import {DatePipe} from '@angular/common';
import {basePage} from '../../models/basePage';
import {DataServiceProvider} from '../../providers/data-service/data-service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

//ok
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

    constructor(public navCtrl: NavController, private api: DataServiceProvider, public formBuilder: FormBuilder, public navParams: NavParams, private datePicker: DatePicker) {
        super();
        this.GetSignup();
        this.register = this.formBuilder.group({
            WEB_USER_ID: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(16)])],
            PRODUCT_CODE: "",
            POLICY_NBR: ["", Validators.compose([Validators.required, Validators.pattern('([a-zA-Z]{3,3})(\\/)([0-9]{6,14})')])],
            PIN: "",
            EMAIL: [],
            MOBILE: []
        });
        //Listen to email value and update validators of phoneNumber accordingly
        this.register.get('EMAIL').valueChanges.subscribe(data => this.onEmailValueChanged(data));
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
        alert(JSON.stringify(this.registerInfo));
    }

}
