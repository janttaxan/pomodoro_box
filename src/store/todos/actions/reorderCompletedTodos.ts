import { ActionCreator } from 'redux';
import { Todo } from 'core/entities/todo';

export const REORDER_COMPLETED_TODOS = 'REORDER_COMPLETED_TODOS';

export type ReorderCompletedTodos = {
  type: typeof REORDER_COMPLETED_TODOS;
  payload: Array<Todo>;
};

export const reorderCompletedTodos: ActionCreator<ReorderCompletedTodos> = (todos: Array<Todo>) => ({
  type: REORDER_COMPLETED_TODOS,
  payload: todos
});
