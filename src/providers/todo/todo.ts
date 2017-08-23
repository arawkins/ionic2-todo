import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoProvider {

    private _todos: BehaviorSubject<Todo[]>;
    private _data: Todo[]

    constructor() {
        this._data = [];
        this._todos = new BehaviorSubject<Todo[]>([]);
    }

    public get todos() {
        return this._todos.asObservable();
    }

    public addTodo(newTodo:Todo) {
        if (newTodo != undefined && newTodo.title != '') {
            this._data.push(newTodo);
            this._todos.next(this._data);
        } else {
            throw new Error("Could not add todo with title " + newTodo.title);
        }
    }
}

export class Todo {

    public title:string;
    public uid:string;
    public completed:boolean;

    // stored as timestamps
    public created:number;
    public due:number;

    constructor(title:string, uid:string) {
        this.title = title;
        this.uid = uid;
        this.completed = false;
        this.created = Date.now();
        this.due = null;
    }
}
