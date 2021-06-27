/* eslint-disable */

import { ThunkAction } from 'redux-thunk';
import { RootState } from 'core/entities/store';
import { Action } from 'redux';

import { setStatus } from 'store/timer/actions/setStatus';
import { setSeconds } from 'store/timer/actions/setSeconds';
import { setMinutes } from 'store/timer/actions/setMinutes';

export const startTimerAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
  let timer: NodeJS.Timeout;

  function decreaseTimerTime(currentMinute: number, currentSecond: number) {
    if (currentMinute === 0 && currentSecond === 0) {
      clearInterval(timer);
    }

    if (currentMinute > 0 && currentSecond === 0) {
      dispatch(setMinutes(currentMinute - 1));
      dispatch(setSeconds(59));
    }

    if (currentSecond > 0) {
      dispatch(setSeconds(currentSecond - 1));
    }
  }

  if (getState().timer.status === 'default' || getState().timer.status === 'pauseWork') {
    dispatch(setStatus('work'));

    timer = setInterval(() =>
      decreaseTimerTime(getState().timer.todo.time.minute, getState().timer.todo.time.second), 1000);
  }
};
