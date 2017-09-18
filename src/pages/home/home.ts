import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Params_Authenticate } from '../../models/models';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { basePage } from '../../models/basePage';
import { RegisterPage } from '../register/register';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { PortfolioPage } from '../portfolio/portfolio';
import { Toast } from '@ionic-native/toast';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends basePage {
  data: Params_Authenticate = new Params_Authenticate();
  constructor(public navCtrl: NavController,private toast: Toast, private api: DataServiceProvider, private common: CommonServiceProvider) {
    super();
    this.data.USER_NAME = 'adib';
    this.data.PASSWORD = '454540@KBTFSPA';

    this.api.DQNewSession().subscribe((data) => {this.common.SESSION_ID = data;})

  }
  Authenticate() {
    this.Processing = true;
    this.api.Authenticate(this.data).subscribe(
        (result) => {
      this.Processing = false;
      if (result.Is_Authentic){
        this.navCtrl.push(PortfolioPage);
      }
      else
      {
        this.toast.show("Invalid User Name / Password", '2000', 'top').subscribe(()=>{});
      }
    });
  }

  ProceedToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
