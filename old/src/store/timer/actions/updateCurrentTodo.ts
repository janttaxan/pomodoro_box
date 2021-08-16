import { ActionCreator } from 'redux';

export const UPDATE_CURRENT_TODO = 'UPDATE_CURRENT_TODO';

export type UpdateCurrentTodo = {
  type: typeof UPDATE_CURRENT_TODO;
  payload: {
    id: Optional<string>;
  };
};

export const updateCurrentTodo: ActionCreator<UpdateCurrentTodo> = (id: Optional<string> = null) => ({
  type: UPDATE_CURRENT_TODO,
  payload: {
    id
  }
});
