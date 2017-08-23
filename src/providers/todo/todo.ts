import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoProvider {

    private _todos: BehaviorSubject<Todo[]>;
    private _data: Todo[]

    constructor() {
        this._data = new Array<Todo>();
        this._todos = new BehaviorSubject<Todo[]>(new Array<Todo>());
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

    private static count:number = 1;
    private _title:string;
    private _id:number;

    constructor(title:string) {
        this.id = Todo.count++;
        this.title = title;
    }

    get id():number {
        return this._id;
    }

    set id(newId:number) {
        this._id = newId;
    }

    get title():string {
        return this._title;
    }

    set title(title:string) {
        this._title = title;
    }

}
