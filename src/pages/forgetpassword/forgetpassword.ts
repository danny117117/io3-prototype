import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {DataServiceProvider} from "../../providers/data-service";
import {ForgetpasswordProvider} from "../../providers/forgetpassword-provider";

@Component({
    selector: 'page-forgetpassword',
    templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {
    secretquestion = "";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public forgotpasswordProvider: ForgetpasswordProvider,
                public alertCtrl:AlertController) {
    }

    onForgetPasswor(form) {
        this.secretquestion = form.value.secretquestion;
        this.forgotpasswordProvider.ForgetPassword(this.secretquestion).subscribe((data) => {
            if(data.res=="validate"){
                const alert = this.alertCtrl.create({
                    subTitle:"An Email Has Been Send With Your New Password",
                    buttons:[
                        {
                            text:"ok"
                        }
                    ]
                });
                alert.present();
            }
            else{
                const alert = this.alertCtrl.create({
                    subTitle:"The Question You Enter Was Wrong Please Contact Back Office",
                    buttons:[
                        {
                            text:"ok"
                        }
                    ]
                });
                alert.present();
            }


        },(err)=>{
            alert("Something Went Wrong");
        })
    }
}

