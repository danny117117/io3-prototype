import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Polcom } from '../../models/models';

/**
 * Generated class for the PortfolioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {
  policies: Polcom[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: DataServiceProvider) {
    this.api.Get_Portfolio().subscribe((data) => {
      this.policies = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortfolioPage');
  }

}
