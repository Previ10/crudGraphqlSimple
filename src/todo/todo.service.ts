import { Injectable, NotFoundException } from '@nestjs/common';
import { todoEntity } from './entity/todo-entity';
import { CreateTodoImput } from './dto/createTodo-imput-dto';
import { UpdateTodoImput } from './dto/updateTodo-imputs-dto';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {


    private todos: todoEntity[] = [
        { id: 1, description: "piedra", done: false },
        { id: 2, description: "papel", done: false },
        { id: 3, description: "tijeras", done: true },
        { id: 3, description: "viento", done: true },
        { id: 3, description: "agua", done: true },


    ];

    findAll(statusArgs?: StatusArgs): todoEntity[] {
        if (statusArgs && statusArgs.status !== undefined) {
            return this.todos.filter(todo => todo.done === statusArgs.status);
        }
        
        
        return this.todos;
    }
    
    findOne(id: number): todoEntity {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) throw new NotFoundException(`NO SE ENCONTRO TODO CON EL #${id}`)
        return todo;
    }

    createTodo(createTodoInput: CreateTodoImput): todoEntity {
        const todo: todoEntity = {
            id: this.todos.length + 1,
            description: createTodoInput.description,
            done: false,
        };
        this.todos.push(todo);
        return todo;
    }
    updateTodo(updateTodoImput: UpdateTodoImput) {
        const { id, description, done } = updateTodoImput;
        const updateTodo = this.findOne(id)

        if (description) updateTodo.description = description;
        if (done !== undefined) updateTodo.done = done;

        this.todos = this.todos.map(todo => {

            if (todo.id === id) {
                return updateTodo
            }

            return todo;
        }

        )
        return updateTodo;
    }
    dedeleteTodo(id: number){
        const todo = this.findOne(id);
        this.todos = this.todos.filter(todo => todo.id !== id)
        return true


    }
    getTotalTodos(){
        return this.todos.length
    }
    getCompletedTodos(){
        return this.todos.filter(todo => todo.done === true).length
    }
    getPendingTodos(){
        return this.todos.filter(todo => todo.done === false).length

    }





}
