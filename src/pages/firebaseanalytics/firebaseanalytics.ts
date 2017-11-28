import {Component} from '@angular/core';
import {Firebase} from "@ionic-native/firebase";
import {Platform} from "ionic-angular";
import {FirebaseProvider} from "../../providers/firebase/firebase";


@Component({
    selector: 'page-firebaseanalytics',
    templateUrl: 'firebaseanalytics.html',
})
export class FirebaseanalyticsPage {
    maindata = "";
    errordata = "";
    token;

    constructor(private firebase: Firebase,
                public platform: Platform,
                public firebaseprovider: FirebaseProvider) {
        this.firebase.grantPermission().then((data) => {
            this.firebaseprovider.onToast(data);
        }).catch((err) => {
            this.firebaseprovider.onToast(err);
        });
        this.firebase.logEvent("page_view", {page: "dashboard"}).then(
            (data) => {
                this.maindata = JSON.stringify(data);
            }
        ).catch(function (err) {
            this.errordata = err;
        });

    }
}