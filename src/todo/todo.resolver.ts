import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { todoEntity } from './entity/todo-entity';
import { TodoService } from './todo.service';
import { CreateTodoImput } from './dto/createTodo-imput-dto';
import { UpdateTodoImput } from './dto/updateTodo-imputs-dto';
import { StatusArgs } from './dto/args/status.args';
import { AgregationsType } from './types/agregation.type';

@Resolver(() => todoEntity)
export class TodoResolver {
    constructor(private readonly todoService: TodoService) { }

    @Query(() => [todoEntity], { name: "todos" })
    findAll(@Args() statusArgs: StatusArgs): todoEntity[] {
        return this.todoService.findAll(statusArgs);
    }

    @Query(() => todoEntity, { name: "todo" })
    findOne(@Args("id", { type: () => Int }) id: number) {
        return this.todoService.findOne(id);
    }
    @Query(() => Int, {name:"TotalTodos"}) 
    completeTodos(): number {
        return this.todoService.getTotalTodos();
    }
    @Query(() => Int, {name:"CompletedTodos"}) 
    getCompletedTodos(): number {
        return this.todoService.getCompletedTodos();

    }
    @Query(() => Int, {name:"PendingTodos"}) 
    getPendingTodos(): number {
        return this.todoService.getPendingTodos();

    }
    @Mutation(() => todoEntity, { name: "createTodo" })
    createTodo(@Args("CreateTodoInput") createTodoInput: CreateTodoImput) {
        return this.todoService.createTodo(createTodoInput);
    }

    @Mutation(() => todoEntity, { name: "updateTodo" })
    updateTodo(
        @Args("UpdateTodoInput") updateTodoInput: UpdateTodoImput 
    ) {
        return this.todoService.updateTodo(updateTodoInput);
    }

    @Mutation(() => Boolean)
    deleteTodo(@Args("id", { type: () => Int }) id: number) {
        return this.todoService.dedeleteTodo(id);
    }
    @Query(() => AgregationsType)
    agregations(): AgregationsType {
        return{

        completed: this.todoService.getCompletedTodos(),
        pending: this.todoService.getPendingTodos(),
        total:this.todoService.getTotalTodos(),


    }

}
}
