import { Injectable, NotFoundException } from '@nestjs/common';
import { todoEntity } from './entity/todo-entity';
import { CreateTodoImput } from './dto/createTodo-imput-dto';
import { UpdateTodoImput } from './dto/updateTodo-imputs-dto';

@Injectable()
export class TodoService {


    private todos: todoEntity[] = [
        { id: 1, description: "piedra", done: false },
        { id: 2, description: "papel", done: false },
        { id: 3, description: "tijeras", done: true },


    ];

    findAll(): todoEntity[] {
        return this.todos
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
}
