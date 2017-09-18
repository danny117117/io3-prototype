import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { RegisterInfo, Params_GetSignup, Codes } from '../../models/models';
import { DatePipe } from '@angular/common';
import { basePage } from '../../models/basePage';
import { DataServiceProvider } from '../../providers/data-service/data-service';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends basePage {
  products: Codes[] = [];
  registerInfo: RegisterInfo = new RegisterInfo();
  constructor(public navCtrl: NavController,private api: DataServiceProvider, public navParams: NavParams, private datePicker: DatePicker) {
    super();       
    this.GetSignup();
  }

  GetSignup(){
    let param = new Params_GetSignup();
    this.api.GetSignup(param).subscribe((data)=> {
      this.products = data.filter(x=> x.Tbl_Name == '_WebProducts');      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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
        this.registerInfo.EXPIRY_DATE =  this.FormatDate(date);
      },
      err => alert(err)
      );
  }

  Register() {
    alert(JSON.stringify(this.registerInfo));
  }

}
