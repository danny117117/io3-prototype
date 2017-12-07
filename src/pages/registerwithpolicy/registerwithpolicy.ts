import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {FormGroup} from "@angular/forms";
import {RegisterProvider} from "../../providers/register-provider";

@Component({
    selector: 'page-registerwithpolicy',
    templateUrl: 'registerwithpolicy.html',
})
export class RegisterwithpolicyPage {
    registerwithpolicy: FormGroup;
    registerpolicynumber = "";
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public register: RegisterProvider,
                public alertCtrl: AlertController) {
    }

    onRegisterWithPolicy(form) {
        this.registerpolicynumber = form.value.registerpolicynumber;
        this.register.RegisterWithPolicy(this.registerpolicynumber).subscribe((data) => {
            if (data.res == "validate") {
                alert("Do Next");
            }
            else {
                const load = this.alertCtrl.create({
                    title: "Invalid Secret Number",
                    subTitle: "The Number You Enter Was Incorrect",
                    buttons: [
                        {
                            text: "OK"
                        }
                    ]
                });
                load.present();
            }
        }, (err) => {
            alert(JSON.stringify(err));
        })
    }
}
