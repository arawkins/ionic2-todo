import {} from 'jasmine';
import { TodoProvider, Todo } from './todo';

let todoProvider = null;

describe('TodoProvider Service', () => {

    beforeEach(() => {
        todoProvider = new TodoProvider();
    });

    it('There should be no ToDos on load', () => {
        expect(todoProvider._data.length).toBe(0);
    });

    it('Calling addToDo should add a new ToDo to _data', () => {
        let newTodo = new Todo('Test');
        todoProvider.addTodo(newTodo);
        expect(todoProvider._data.length).toBe(1);
    });

    it('The todos subject should notify subscribers when a new todo is added', () => {
        let newTodo = new Todo('Test');
        let testTodos = [];

        todoProvider.todos.subscribe(updatedTodos => {
             testTodos = updatedTodos;
        });

        todoProvider.addTodo(newTodo);
        expect(testTodos.length).toBe(1);
    });

});
