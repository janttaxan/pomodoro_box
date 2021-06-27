import { ActionCreator } from 'redux';

export const REMOVE_TODO_POMODORO = 'REMOVE_TODO_POMODORO';

export type RemoveTodoPomodoro = {
  type: typeof REMOVE_TODO_POMODORO;
  payload: {
    id: string;
  };
};

export const removeTodoPomodoro: ActionCreator<RemoveTodoPomodoro> = (id: string) => ({
  type: REMOVE_TODO_POMODORO,
  payload: {
    id
  }
});
