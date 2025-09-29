import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, GetTodosArgs } from './dtos';
import { AggregationType } from './types/aggregation.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() getTodosArgs: GetTodosArgs): Todo[] {
    return this.todoService.findAll(getTodosArgs);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  create(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  update(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'removeTodo' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.remove(id);
  }

  // Aggregations
  @Query(() => Int, { name: 'totalTodos' })
  getTotalTodos() {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, { name: 'completedTodos' })
  getCompletedTodos() {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, { name: 'pendingTodos' })
  getPendingTodos() {
    return this.todoService.pendingTodos;
  }

  @Query(() => AggregationType, { name: 'aggregations' })
  getAggregations(): AggregationType {
    return {
      total: this.todoService.totalTodos,
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      totalTodosCompleted: this.todoService.totalTodos,
    };
  }
}
