import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AddTodoModalPage } from '../add-todo-modal/add-todo-modal';
import { Todo } from '../../providers/todo/todo';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    private todos:FirebaseListObservable<Todo[]>;

    constructor(
        private modalCtrl: ModalController,
        private firebaseDb: AngularFireDatabase
    ) {}

    ngOnInit() {
        this.todos = this.firebaseDb.list('/todos');
    }

    presentAddTodoModal() {
        let addTodoModal = this.modalCtrl.create(AddTodoModalPage)

        addTodoModal.onDidDismiss(data => {
            if (data != undefined && data != null && typeof data == 'string' && data.length > 0) {
                let newTodo = new Todo(data);
                this.todos.push(newTodo);
            }
        });

        addTodoModal.present();
    }
}
