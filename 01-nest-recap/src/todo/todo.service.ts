import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Learn NestJS',
      done: false,
    },
    {
      id: 2,
      description: 'Learn TypeScript',
      done: false,
    },
  ];

  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo = new Todo();

    newTodo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    newTodo.description = createTodoDto.description;

    this.todos.push(newTodo);

    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);

    const updatedTodo: Todo = {
      ...todo,
      ...updateTodoDto,
    };

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return updatedTodo;
      }
      return todo;
    });

    return updatedTodo;
  }

  remove(id: number): Todo {
    const todo = this.findOne(id);

    this.todos = this.todos.filter((todo) => todo.id !== id);

    return todo;
  }
}
