import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import {Toast} from "@ionic-native/toast";
import {AngularFireDatabase} from "angularfire2/database";
import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Firebase} from "@ionic-native/firebase";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable'



@Injectable()
export class FirebaseProvider {
    // authListener;
    users: boolean = true;
    user;
    notregisteredlist;
    authListener;
    userId;
    api="https://us-central1-client-space-mobile.cloudfunctions.net/";

    constructor(public http: Http,
                public firebaseAuth: AngularFireAuth,
                public toast: Toast,
                public afDB: AngularFireDatabase,
                public events: Events,
                private storage: Storage,
                public firebase: Firebase) {


        this.notregisteredlist = afDB.list('/notregistered');

        this.authListener = this.firebaseAuth.authState.subscribe(user => {
            if (user) {
                this.authListener.unsubscribe();
                this.users = true;

            } else {
                this.users = false;
                this.authListener.unsubscribe();
            }
        }, (err) => {
            alert(err);
        });

    }




    signup(email: string, password: string) {

        // this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
        //     .then(value => {
        //         this.onToast('Success!,' + value);
        //     })
        //     .catch(err => {
        //         this.onToast('Something went wrong:,' + err.message);
        //     });

        // this.firebase.onTokenRefresh()


            return this.http.get(this.api+"sign_up")
                .do(this.logResponse)
                .map(this.extractData)
                .catch(this.catchError);



    }

    login(newEmail: string, newPassword: string){
        // return this.firebaseAuth.auth.signInWithEmailAndPassword(newEmail, newPassword).then((user) => {
        //     this.onToast(user);
        //     this.storage.get('UserUID').then((key) => {
        //         this.notregisteredlist.remove(key)
        //             .then((data) => {
        //                 this.storage.get('hasSignIn').then((val) => {
        //                     if (val != true) {
        //                         this.userRegistered(user.uid, user.email);
        //                         this.storage.set('hasSignIn',true)
        //                     }
        //                 });
        //             });
        //     });
        // }).catch((err) => {
        //     this.onToast(err.message);
        // });
    }


    notRegistered(token) {
        // this.afDB.list('/notregistered').push({
        //     tokenuser: token,
        // }).then((data) => {
        //     this.storage.set("gotUserToken", true);
        //     this.getUserUID(data);
        //     ///alert(data)
        // });
        let headers = new Headers({
            'content-type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let data = {
            token:token
        };
        return this.http.post(this.api+"notRegistered", JSON.stringify(data), options)
            .do(this.logResponse)
            .map(this.extractData)
            .subscribe(()=>{
            alert("da");
            });
    }

    userRegistered(user, email) {
        this.firebase.getToken()
            .then((tokenuser) => {
                this.afDB.list('/registered').push({
                    tokenuser: tokenuser,
                    userName: "danny",
                    UserUID: user,
                    Email: email
                }).then((data) => {
                    this.storage.set("gotUserToken", true);
                    this.getUserUID(data);
                    //alert(data)
                });
            }).catch((error) => {
            this.onToast(error);
        });
    }







    private catchError(error: Response | any) {
        console.log(error);
        return Observable.throw(error.jason().error() || "Server Error");
    }

    private logResponse(res: Response) {
        console.log(res);
    }

    private extractData(res: Response) {
        return res.json();
    }

    logoutUser() {
        return this.firebaseAuth.auth.signOut();
    }
    getUserUID(data) {
        this.userId = data.key;
        this.storage.set("UserUID", this.userId);
    }
    onToast(data) {
        this.toast.show(JSON.stringify(data), '5000', 'top').subscribe();
    }

}