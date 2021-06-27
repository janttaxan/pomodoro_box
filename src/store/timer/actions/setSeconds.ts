import { ActionCreator } from 'redux';

export const SET_SECONDS = 'SET_SECONDS';

export type SetSeconds = {
  type: typeof SET_SECONDS;
  payload: {
    value: number;
  };
};

export const setSeconds: ActionCreator<SetSeconds> = (value: number) => ({
  type: SET_SECONDS,
  payload: {
    value
  }
});
