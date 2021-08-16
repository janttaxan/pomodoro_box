import { ActionCreator } from 'redux';

export const ADD_TODO_POMODORO = 'ADD_TODO_POMODORO';

export type AddTodoPomodoro = {
  type: typeof ADD_TODO_POMODORO;
  payload: {
    id: string;
  };
};

export const addTodoPomodoro: ActionCreator<AddTodoPomodoro> = (id: string) => ({
  type: ADD_TODO_POMODORO,
  payload: {
    id
  }
});
