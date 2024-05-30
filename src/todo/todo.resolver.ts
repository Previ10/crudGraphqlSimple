import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { todoEntity } from './entity/todo-entity';
import { TodoService } from './todo.service';
import { CreateTodoImput } from './dto/createTodo-imput-dto';
import { UpdateTodoImput } from './dto/updateTodo-imputs-dto';

@Resolver()
export class TodoResolver {
    constructor(private readonly todoService: TodoService) { }

    @Query(() => [todoEntity], { name: "todos" })
    findAll(): todoEntity[] {
        return this.todoService.findAll();
    }

    @Query(() => todoEntity, { name: "todo" })
    findOne(@Args("id", { type: () => Int }) id: number) {
        return this.todoService.findOne(id);
    }

    @Mutation(() => todoEntity, { name: "createTodo" })
    createTodo(@Args("CreateTodoInput") createTodoInput: CreateTodoImput) {
        return this.todoService.createTodo(createTodoInput);
    }

    @Mutation(() => todoEntity, { name: "updateTodo" })
    updateTodo(
        @Args("UpdateTodoInput") updateTodoInput: UpdateTodoImput // Corregir el nombre del argumento
    ) {
        return this.todoService.updateTodo(updateTodoInput);
    }

    @Mutation(() => [todoEntity], { name: "deleteTodo" })
    deleteTodo() {
        return [];
    }
}
