import { ActionCreator } from 'redux';
import { Todo } from 'core/entities/todo';

export const MOVE_TODO_TO_COMPLETED = 'MOVE_TODO_TO_COMPLETED';

export type MoveTodoToCompleted = {
  type: typeof MOVE_TODO_TO_COMPLETED;
  payload: Todo;
};

export const moveTodoToCompleted: ActionCreator<MoveTodoToCompleted> = (todo: Todo) => ({
  type: MOVE_TODO_TO_COMPLETED,
  payload: todo
});
