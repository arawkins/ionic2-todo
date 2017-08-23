import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AddTodoModalPage } from '../add-todo-modal/add-todo-modal';
import { AuthProvider } from '../../providers/auth/auth';
import { Todo } from '../../providers/todo/todo';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    private todos:FirebaseListObservable<Todo[]>;

    constructor(
        private _modalCtrl: ModalController,
        private _firebaseDb: AngularFireDatabase,
        private _authProvider: AuthProvider
    ) {
        this.todos = this._firebaseDb.list('/todos');
    }

    presentAddTodoModal() {
        let addTodoModal = this._modalCtrl.create(AddTodoModalPage)

        addTodoModal.onDidDismiss(data => {
            if (data != undefined && data != null && typeof data == 'string' && data.length > 0 && this._authProvider.uid != '') {
                let newTodo = new Todo(data, this._authProvider.uid);
                this.todos.push(newTodo);
            }
        });

        addTodoModal.present();
    }

    get signedIn():boolean {
        return this._authProvider.authenticated;
    }

    get signingIn():boolean {
        return this._authProvider.authenticating;
    }

    get signInError():Error {
        return this._authProvider.authError;
    }

    get displayName():string {
        return this._authProvider.displayName;
    }

    signInWithGoogle():void {
        this._authProvider.signInWithGoogle();
    }

    signOut():void {
        this._authProvider.signOut();
    }

}
