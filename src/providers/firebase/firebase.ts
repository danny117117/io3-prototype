import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import {Toast} from "@ionic-native/toast";
import {AngularFireDatabase} from "angularfire2/database";
import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Firebase} from "@ionic-native/firebase";


@Injectable()
export class FirebaseProvider {
    // authListener;
    users: boolean = true;
    user;
    notregisteredlist;
    authListener;
    userId;

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

        this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(value => {
                this.onToast('Success!,' + value);
            })
            .catch(err => {
                this.onToast('Something went wrong:,' + err.message);
            });

        // this.firebase.onTokenRefresh()
    }

    login(newEmail: string, newPassword: string): Promise<any> {
        return this.firebaseAuth.auth.signInWithEmailAndPassword(newEmail, newPassword).then((data) => {
            this.onToast(data);
            this.storage.get('UserUID').then((key) => {
                this.notregisteredlist.remove(key)
                    .then((data) => {
                        this.userRegistered();
                    });
            });
        }).catch((err) => {
            this.onToast(err.message);
        });
    }

    notRegistered(token) {
        this.afDB.list('/notregistered').push({
            tokenuser: token,
        }).then((data) => {
                this.storage.set("gotUserToken", true);
                this.getUserUID(data);
                //alert(data)
            });
    }

    userRegistered() {
        const token=this.firebase.getToken()
            .then((tokenuser) => {
                alert(tokenuser);
            }).catch((error) => {
        });
        this.afDB.list('/registered').push({})
            .then((data) => {
                //tokenuser: token,
                this.getUserUID(data);
                alert(data)
            });
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
