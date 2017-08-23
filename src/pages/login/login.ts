import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(
        private _navCtrl: NavController,
        private _authProvider: AuthProvider
        ) {}

    get signingIn():boolean {
        return this._authProvider.authenticating;
    }

    get signInError():Error {
        return this._authProvider.authError;
    }

    signInWithGoogle(): void {
        this._authProvider.signInWithGoogle().then(result => {
            this._navCtrl.setRoot(HomePage);
        }, error => {
            console.log(error);
        });
    }

}
