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

    private todos:Todo[];

    constructor(
        private modalCtrl: ModalController,
        private todoProvider: TodoProvider
    ) {}

    ngOnInit() {
        this.todoProvider.todos.subscribe(updatedTodos => {
             this.todos = updatedTodos;
        });
    }

    presentAddTodoModal() {
        let addTodoModal = this.modalCtrl.create(AddTodoModalPage)

        addTodoModal.onDidDismiss(data => {
            if (data != undefined && data != null && typeof data == 'string' && data.length > 0) {
                // console.log(data);
                let newTodo = new Todo(data);
                this.todoProvider.addTodo(newTodo);
            }
        });
        addTodoModal.present();
    }
}
