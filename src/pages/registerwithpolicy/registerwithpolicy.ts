import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataServiceProvider} from "../../providers/data-service/data-service";



@Component({
    selector: 'page-registerwithpolicy',
    templateUrl: 'registerwithpolicy.html',
})
export class RegisterwithpolicyPage {


    registerwithpolicy: FormGroup;
    registerpolicynumber="";


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public formBuilder: FormBuilder,
                public data:DataServiceProvider) {

    }

    onRegisterWithPolicy(form) {

        this.registerpolicynumber = form.value.registerpolicynumber;

        this.data.RegisterWithPolicy(this.registerwithpolicy).subscribe((data)=>{

        },(err)=>{
            alert(JSON.stringify(err));
        })



    }



}
