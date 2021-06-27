import { Todo } from 'core/entities/todo';

export interface RootState {
  common: {
    // Время одного помидора (кол-во минут)
    pomodoroTime: number;
  };
  todos: TodosState;
}

export interface TodosState {
  list: Array<Todo>;
}
