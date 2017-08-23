import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-add-todo-modal',
    templateUrl: 'add-todo-modal.html',
})
export class AddTodoModalPage {

    public newTodo;

    constructor(
        private _viewCtrl: ViewController
    ) { }

    cancel() {
        this._viewCtrl.dismiss();
    }

    submit() {
        // this.newTodo is bound to the input field on the modal
        this._viewCtrl.dismiss(this.newTodo);
    }

}
