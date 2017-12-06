import {Inject, Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {
    Params_Authenticate,
} from '../models/login.models';
import {User} from '../models/user.models'
import {SerializationHelper} from "../models/serializationHelper.models"
import {Observable} from "rxjs/Observable";
import {CommonServiceProvider} from "./common-service";
import {APP_CONFIG, AppConfig} from "../config/configs";

@Injectable()
export class AuthenticateProvider {
    url: string = '';
    API:string="";
  constructor(public http: Http,
              private common: CommonServiceProvider,
              @Inject(APP_CONFIG) public config: AppConfig) {
      this.API=this.config.apiAddress;

  }
    Authenticate(Params: Params_Authenticate): Observable<User> {
        this.url = this.API + '/Authenticate';
        const headers = new Headers({ 'Content-Type': 'application/json', 'SESSION_ID': this.common.SESSION_ID });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.url, JSON.stringify(Params), options)
            .map((res: Response) => {
                const body = res.json();
                let ret: User = new User();
                ret = SerializationHelper.toInstance(ret, JSON.stringify(body));
                console.log(ret);
                return ret;
            }).catch(this.handleErrorPromise);
    }









    handleErrorPromise(error: Response | any) {
        //console.error(error.message || error);
        alert('Error: ' + JSON.stringify(error));
        return Promise.reject(error.message || error);
    }



}
