import { Todo } from 'core/entities/todo';

export interface RootState {
  todos: TodosState;
}

export interface TodosState {
  list: Array<Todo>;
}
