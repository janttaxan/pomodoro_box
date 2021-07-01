import { ActionCreator } from 'redux';

export const SET_POMODORO_COUNT = 'SET_POMODORO_COUNT';

export type SetPomodoroCount = {
  type: typeof SET_POMODORO_COUNT;
  payload: {
    value: number;
  };
};

export const setPomodoroCount: ActionCreator<SetPomodoroCount> = (value: number) => ({
  type: SET_POMODORO_COUNT,
  payload: {
    value
  }
});
