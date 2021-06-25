import { ActionCreator } from 'redux';

export const DELETE_TODO = 'DELETE_TODO';

export type DeleteTodo = {
  type: typeof DELETE_TODO;
  payload: {
    id: string;
  }
}

export const deleteTodo: ActionCreator<DeleteTodo> = (payload) => ({
  type: DELETE_TODO,
  payload
});
