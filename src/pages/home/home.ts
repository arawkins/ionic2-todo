import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddTodoModalPage } from '../add-todo-modal/add-todo-modal';
import { TodoProvider } from '../../providers/todo/todo';
import { Todo } from '../../providers/todo/todo';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    private _todos:Todo[];

    constructor(
        private _modalCtrl: ModalController,
        private _todoProvider: TodoProvider
    ) {}

    ngOnInit() {
        this._todoProvider.todos.subscribe(updatedTodos => {
             this._todos = updatedTodos;
        });
    }

    get todos():Todo[] {
        return this._todos;
    }

    presentAddTodoModal() {
        let addTodoModal = this._modalCtrl.create(AddTodoModalPage)

        addTodoModal.onDidDismiss(data => {
            if (data != undefined && data != null && typeof data == 'string' && data.length > 0) {
                let newTodo = new Todo(data);
                this._todoProvider.addTodo(newTodo);
            }
        });
        addTodoModal.present();
    }
}
