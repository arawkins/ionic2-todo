import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

    private _currentUser: firebase.User;
    private _authenticating: boolean;
    private _authError: Error;

    constructor(
        private _afAuth: AngularFireAuth
    ) {
        this._authenticating = false;
        this._authError = null;
        this._afAuth.authState.subscribe((user:firebase.User) => {
            this._currentUser = user;
        });
    }

    get authenticated(): boolean {
        return this._currentUser != null;
    }

    get authenticating(): boolean {
        return this._authenticating;
    }

    set authenticating(isAuthenticating:boolean) {
        this._authenticating = isAuthenticating;
    }

    get authError():Error {
        return this._authError;
    }

    set authError(newError:Error) {
        this._authError = newError;
    }

    get displayName():string {
        if (this.authenticated) {
            return this._currentUser.displayName;
        } else {
            return '';
        }
    }

    get uid():string {
        if (this.authenticated) {
            return this._currentUser.uid;
        } else {
            return '';
        }
    }

    signInWithGoogle(): firebase.Promise<any> {
        this.authenticating = true;
        this._authError = null;
        return this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(result => {
                this.authenticating = false;
            }).catch(error => {
                console.log("Could not authenticate with google", error);
                this.authenticating = false;
                this.authError = error;
            });
    }

    signOut(): void {
        this._afAuth.auth.signOut();
    }

}
