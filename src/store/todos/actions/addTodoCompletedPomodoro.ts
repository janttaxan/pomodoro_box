import { ActionCreator } from 'redux';

export const ADD_TODO_COMPLETED_POMODORO = 'ADD_TODO_COMPLETED_POMODORO';

export type AddTodoCompletedPomodoro = {
  type: typeof ADD_TODO_COMPLETED_POMODORO;
  payload: {
    id: string;
  };
};

export const addTodoCompletedPomodoro: ActionCreator<AddTodoCompletedPomodoro> = (id: string) => ({
  type: ADD_TODO_COMPLETED_POMODORO,
  payload: {
    id
  }
});
