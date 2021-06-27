import { ActionCreator } from 'redux';

export const INIT_TIMER_TIME = 'INIT_TIMER_TIME';

export type InitTimerTime = {
  type: typeof INIT_TIMER_TIME;
  payload: {
    minute: number;
    second: number;
  };
};

export const initTimerTime: ActionCreator<InitTimerTime> = (minute: number, second: number) => ({
  type: INIT_TIMER_TIME,
  payload: {
    minute,
    second
  }
});
