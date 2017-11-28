import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { PushOptions, PushObject, Push, AndroidPushOptions } from '@ionic-native/push';
import { TranslateService } from "@ngx-translate/core";
import { Platform } from "ionic-angular";

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonServiceProvider
{
  APIBaseURL: string = 'http://192.168.12.28/WebAPIProtoType/Api/Polcom';
  SESSION_ID: string = '';

  //PNS_Options: PushOptions = {};

  constructor (public http: Http, /*private push: Push,*/
    public translateService: TranslateService, public platform: Platform
  )
  {

    // this.PNS_Options = {
    //   android: {

    //   },
    //   ios: {
    //     alert: 'true',
    //     badge: true,
    //     sound: 'false'
    //   },
    //   windows: {},
    //   browser: {
    //     pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    //   }
    // };

  }




  // Register_PNS(OnRegistration: (x: any) => void)
  // {
  //
  //   const pushObject: PushObject = this.push.init(this.PNS_Options);
  //
  //   pushObject.on('notification').subscribe((notification: any) =>
  //   {
  //     alert(notification);
  //     //alert('Received a notification:' + JSON.stringify(notification));
  //     OnRegistration(notification);
  //   }
  //   );
  //
  //   pushObject.on('registration').subscribe((registration: any) =>
  //   {
  //     //alert('Device registered: ' + registration)
  //     alert(JSON.stringify(registration));
  //     OnRegistration(registration.registrationId);
  //   }
  //   );
  //   pushObject.on('error').subscribe(error => alert('Error with Push plugin: ' + error));
  // }






  onLanguageChange(event)
  {
    //  direction: rtl;
    this.translateService.use(event);
    if (event === 'ar')
    {
      this.platform.setDir('rtl', true);
      this.translateService.setDefaultLang(event);


    } else
    {
      this.platform.setDir('ltr', true);
      this.translateService.setDefaultLang(event);

    }
  }
}
