import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {APP_CONFIG, AppConfig} from "../config/configs";
import {CommonServiceProvider} from "./common-service";


@Injectable()
export class ForgetpasswordProvider {

    SESSION_ID: string = '';
    url1: string = '';
    Nodeapi: string = '';

    constructor(public http: Http,
                private common: CommonServiceProvider,
                @Inject(APP_CONFIG) public config: AppConfig) {
        this.Nodeapi = this.config.apiNode;
    }

    ForgetPassword(question) {
        this.url1 = this.Nodeapi + 'forgetpassword';
        const headers = new Headers({
            'content-type': 'application/x-www-form-urlencoded', 'SESSION_ID': this.common.SESSION_ID
        });
        const options = new RequestOptions({
            headers: headers
        });
        let data = "question=" + question;
        return this.http.post(this.url1, data, options).map((res: Response) => {
            return res.json();
        })
    }

}
