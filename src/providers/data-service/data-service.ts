import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {CommonServiceProvider} from '../common-service/common-service';
import {
    User,
    Params_Authenticate,
    SerializationHelper,
    Params_GetSignup,
    Codes,
    Polcom,
    Params_Acquire_PNS_Token
} from '../../models/models';

import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataServiceProvider {
    SESSION_ID: string = '';
    url: string = '';
    constructor(public http: Http, private common: CommonServiceProvider) {}
    handleErrorPromise(error: Response | any) {
        //console.error(error.message || error);
        alert('Error: ' + JSON.stringify(error));
        return Promise.reject(error.message || error);
    }


    DQNewSession(): Observable<string> {
        this.url = this.common.APIBaseURL + '/DQNewSession'
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this.http.post(this.url, {}, options)
            .map((res: Response) => {
                const body = res.json();
                let ret: string = '';
                ret = res.json();
                return ret;
            }).catch(this.handleErrorPromise);
    }


    Authenticate(Params: Params_Authenticate): Observable<User> {
      this.url = this.common.APIBaseURL + '/Authenticate'
      const headers = new Headers({ 'Content-Type': 'application/json', 'SESSION_ID': this.common.SESSION_ID });
      const options = new RequestOptions({ headers: headers });
      return this.http.post(this.url, JSON.stringify(Params), options)
        .map((res: Response) => {
          const body = res.json();
          let ret: User = new User();
          ret = SerializationHelper.toInstance(ret, JSON.stringify(body));
          console.log(ret)
         return ret;
        }).catch(this.handleErrorPromise);
    }


    GetSignup(Params: Params_GetSignup): Observable<Codes[]> {
        this.url = this.common.APIBaseURL + '/GetSignup'
        const headers = new Headers({'Content-Type': 'application/json', 'SESSION_ID': this.common.SESSION_ID});
        const options = new RequestOptions({headers: headers});
        return this.http.post(this.url, JSON.stringify(Params), options)
            .map((res: Response) => {
                const body = res.json();
                let ret: Codes[] = [];
                ret = SerializationHelper.toInstance(ret, JSON.stringify(body));
                return ret;
            })
            .catch(this.handleErrorPromise);
    }


    Get_Portfolio(): Observable<Polcom[]> {
        this.url = this.common.APIBaseURL + '/Get_Portfolio'
        const headers = new Headers({'Content-Type': 'application/json', 'SESSION_ID': this.common.SESSION_ID});
        const options = new RequestOptions({headers: headers});
        return this.http.post(this.url, {}, options)
            .map((res: Response) => {
                const body = res.json();
                let ret: Polcom[] = [];
                ret = SerializationHelper.toInstance(ret, JSON.stringify(body));
                return ret;
            })
            .catch(this.handleErrorPromise);
    }


    Acquire_PNS_Token(Params: Params_Acquire_PNS_Token): Observable<boolean> {
        this.url = this.common.APIBaseURL + '/Acquire_PNS_Token'
        const headers = new Headers({'Content-Type': 'application/json', 'SESSION_ID': this.common.SESSION_ID});
        const options = new RequestOptions({headers: headers});
        return this.http.post(this.url, JSON.stringify(Params), options)
            .map((res: Response) => {
                let ret: boolean = true;
                return ret;
            }).catch(this.handleErrorPromise);
    }
}
