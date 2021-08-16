import { ActionCreator } from 'redux';
import { Todo } from 'core/entities/todo';

export const REORDER_TODOS = 'REORDER_TODOS';

export type ReorderTodos = {
  type: typeof REORDER_TODOS;
  payload: Array<Todo>;
};

export const reorderTodos: ActionCreator<ReorderTodos> = (todos: Array<Todo>) => ({
  type: REORDER_TODOS,
  payload: todos
});
