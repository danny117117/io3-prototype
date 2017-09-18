import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Params_Acquire_PNS_Token } from '../../models/models';
/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private common : CommonServiceProvider, private api: DataServiceProvider) {
    this.common.Register_PNS((x) =>{
      let param = new Params_Acquire_PNS_Token();
      param.input =x;
      this.api.Acquire_PNS_Token(param).subscribe(()=> {alert('Token Saved on Server');});
    });
    this.navCtrl.push(HomePage);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

}
