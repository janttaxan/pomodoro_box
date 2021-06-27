import { ActionCreator } from 'redux';

export const SET_MINUTES = 'SET_MINUTES';

export type SetMinutes = {
  type: typeof SET_MINUTES;
  payload: {
    value: number;
  };
};

export const setMinutes: ActionCreator<SetMinutes> = (value: number) => ({
  type: SET_MINUTES,
  payload: {
    value
  }
});
