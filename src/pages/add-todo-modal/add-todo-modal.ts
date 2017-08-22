import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the AddTodoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-todo-modal',
    templateUrl: 'add-todo-modal.html',
})
export class AddTodoModalPage {

    public newTodo;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) { }

    cancel() {
        this.viewCtrl.dismiss();
    }

    submit() {
        this.viewCtrl.dismiss(this.newTodo);
    }

}
