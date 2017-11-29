import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {Storage} from '@ionic/storage';


@Component({
    selector: 'page-logout',
    templateUrl: 'logout.html',
})
export class LogoutPage {
    userInfo = {};
    userName = "";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage) {
        this.userInfo = this.navParams.get("user");
        this.userName = this.navParams.get("user").USER_NAME;

    }

    onUserLogout() {
        this.storage.remove("userInfo1");
        this.navCtrl.push(HomePage);
    }
}
