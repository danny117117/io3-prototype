import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PushOptions, PushObject, Push } from '@ionic-native/push';

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {
  APIBaseURL: string = 'http://192.168.12.28/WebAPIProtoType/Api/Polcom';
  SESSION_ID: string = '';

  PNS_Options: PushOptions = {};

  constructor(public http: Http, private push: Push) {
    this.PNS_Options = {
      android: {
        senderID: '1002239621785'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };
  }

  Register_PNS() {

    const pushObject: PushObject = this.push.init(this.PNS_Options);

    pushObject.on('notification').subscribe((notification: any) => alert('Received a notification:' + notification));

    pushObject.on('registration').subscribe((registration: any) => alert('Device registered: ' + registration));

    pushObject.on('error').subscribe(error => alert('Error with Push plugin: ' + error));
  }
}
