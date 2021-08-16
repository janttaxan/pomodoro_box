import { ActionCreator } from 'redux';

export const SET_BREAK_COUNT = 'SET_BREAK_COUNT';

export type SetBreakCount = {
  type: typeof SET_BREAK_COUNT;
  payload: {
    value: number;
  };
};

export const setBreakCount: ActionCreator<SetBreakCount> = (value: number) => ({
  type: SET_BREAK_COUNT,
  payload: {
    value
  }
});
