import { ActionCreator } from 'redux';
import { Todo } from 'core/entities/todo';

export const ADD_TODO = 'ADD_TODO';

export type AddTodo = {
  type: typeof ADD_TODO;
  payload: Todo;
};

export const addTodo: ActionCreator<AddTodo> = (todo: Todo) => ({
  type: ADD_TODO,
  payload: todo
});
