import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private common : CommonServiceProvider) {
    this.common.Register_PNS();
    this.navCtrl.push(HomePage);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

}
