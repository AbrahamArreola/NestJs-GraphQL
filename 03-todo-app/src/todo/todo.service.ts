import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { GetTodosArgs, CreateTodoInput, UpdateTodoInput } from './dtos';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Learn NestJS', done: false },
    { id: 2, description: 'Build a GraphQL API', done: true },
    { id: 3, description: 'Learn Golang', done: false },
    { id: 4, description: 'Dockerize API application', done: false },
  ];

  public get totalTodos(): number {
    return this.todos.length;
  }

  public get completedTodos(): number {
    return this.todos.filter((todo) => todo.done).length;
  }

  public get pendingTodos(): number {
    return this.todos.filter((todo) => !todo.done).length;
  }

  findAll(getTodosArgs: GetTodosArgs): Todo[] {
    const { status } = getTodosArgs;

    if (status !== undefined) {
      return this.todos.filter((todo) => todo.done === status);
    }

    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const newTodo = new Todo();
    newTodo.description = createTodoInput.description;
    newTodo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;

    this.todos.push(newTodo);

    return newTodo;
  }

  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;

    const todo = this.findOne(id);

    if (description) todo.description = description;
    if (done !== undefined) todo.done = done;

    return todo;
  }

  remove(id: number): boolean {
    this.findOne(id);

    this.todos = this.todos.filter((todo) => todo.id !== id);

    return true;
  }
}
