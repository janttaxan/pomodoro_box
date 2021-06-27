import { ActionCreator } from 'redux';
import { TimerStatus } from 'core/entities/store';

export const SET_STATUS = 'SET_STATUS';

export type SetStatus = {
  type: typeof SET_STATUS;
  payload: {
    status: TimerStatus;
  };
};

export const setStatus: ActionCreator<SetStatus> = (status: TimerStatus) => ({
  type: SET_STATUS,
  payload: {
    status
  }
});
