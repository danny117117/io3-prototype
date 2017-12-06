import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/map';
import {CommonServiceProvider} from './common-service';
import {
    Polcom
} from '../models/polcom.models';
import {  Codes} from '../models/codes.models'
import { Params_GetSignup} from '../models/Params_GetSignup.models'

import {Params_Acquire_PNS_Token} from '../models/Params_Acquire_PNS_Token.models'
import {SerializationHelper} from "../models/serializationHelper.models";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {APP_CONFIG, AppConfig} from "../config/configs";

@Injectable()
export class DataServiceProvider {
    SESSION_ID: string = '';
    url: string = '';
    url1: string = '';
    API: string = '';
    Nodeapi: string = '';

    constructor(public http: Http,
                private common: CommonServiceProvider,
                @Inject(APP_CONFIG) public config: AppConfig) {
        this.API = this.config.apiAddress;
        this.Nodeapi = this.config.apiNode;
    }

    DQNewSession(): Observable<string> {
        this.url = this.API + '/DQNewSession'
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

    GetSignup(Params: Params_GetSignup): Observable<Codes[]> {
        this.url = this.API + '/GetSignup';
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
        this.url = this.API + '/Get_Portfolio';
        const headers = new Headers({'Content-Type': 'application/json', 'SESSION_ID': this.common.SESSION_ID});
        const options = new RequestOptions({headers: headers});
        return this.http.post(this.url, {}, options)
            .map((res: Response) => {
                const body = res.json();
                let ret: Polcom[] = [];
                ret = SerializationHelper.toInstance(ret, JSON.stringify(body));
                return ret;
            }).catch(this.handleErrorPromise);
    }

    Acquire_PNS_Token(Params: Params_Acquire_PNS_Token): Observable<boolean> {
        this.url = this.API + '/Acquire_PNS_Token'
        const headers = new Headers({'Content-Type': 'application/json', 'SESSION_ID': this.common.SESSION_ID});
        const options = new RequestOptions({headers: headers});
        return this.http.post(this.url, JSON.stringify(Params), options)
            .map((res: Response) => {
                let ret: boolean = true;
                return ret;
            }).catch(this.handleErrorPromise);
    }

    registerInfo(data) {
        this.url1 = this.Nodeapi + 'registerInfo';
        const headers = new Headers({'Content-Type': 'application/json', 'SESSION_ID': this.common.SESSION_ID});
        const options = new RequestOptions({headers: headers});
        return this.http.post(this.url1, JSON.stringify(data), options).map((res: Response) => {
            return res.json();
        })
    }

    handleErrorPromise(error: Response | any) {
        //console.error(error.message || error);
        alert('Error: ' + JSON.stringify(error));
        return Promise.reject(error.message || error);
    }
}
