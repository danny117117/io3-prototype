import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
// import { PushOptions, PushObject, Push, AndroidPushOptions } from '@ionic-native/push';
import {TranslateService} from "@ngx-translate/core";
import {Platform} from "ionic-angular";

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {
    SESSION_ID: string = '';
    constructor(public http: Http,
                public translateService: TranslateService,
                public platform: Platform) {
    }
    onLanguageChange(event) {
        this.translateService.use(event);
        if (event === 'ar') {
            this.platform.setDir('rtl', true);
            this.translateService.setDefaultLang(event);
        } else {
            this.platform.setDir('ltr', true);
            this.translateService.setDefaultLang(event);

        }
    }
}
