/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Reducer } from 'redux';
import { TimerState } from 'core/entities/store';
import { TimerActions } from 'store/timer/actions';

import { initialState } from 'store/store';

import { UPDATE_CURRENT_TODO } from 'store/timer/actions/updateCurrentTodo';
import { SET_STATUS } from 'store/timer/actions/setStatus';
import { INIT_TIMER_TIME } from 'store/timer/actions/initTimerTime';
import { SET_SECONDS } from 'store/timer/actions/setSeconds';
import { SET_MINUTES } from 'store/timer/actions/setMinutes';

export const timerReducer: Reducer<TimerState, TimerActions> = (state = initialState.timer, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_TODO:
      return {
        ...state,
        todo: {
          ...state.todo,

          id: action.payload.id ? action.payload.id : null
        }
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload.status
      };
    case INIT_TIMER_TIME:
      return {
        ...state,
        todo: {
          ...state.todo,
          time: {
            ...state.todo.time,
            minute: action.payload.minute,
            second: action.payload.second
          }
        }
      };
    case SET_SECONDS:
      return {
        ...state,
        todo: {
          ...state.todo,
          time: {
            ...state.todo.time,
            second: action.payload.value
          }
        }
      };
    case SET_MINUTES:
      return {
        ...state,
        todo: {
          ...state.todo,
          time: {
            ...state.todo.time,
            minute: action.payload.value
          }
        }
      };
    default:
      return state;
  }
};
