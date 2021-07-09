// TODO: почистить исключения
/* eslint-disable */
import { Reducer } from 'redux';
import { RootState } from 'core/entities/store';
import { Actions } from 'store/actions';

import { initialState } from 'store/store';

import { todosReducer } from 'store/todos/todosReducer';
import { timerReducer } from 'store/timer/timerReducer';

// TODOS ACTIONS
import { DELETE_TODO } from 'store/todos/actions/deleteTodo';
import { ADD_TODO_POMODORO } from 'store/todos/actions/addTodoPomodoro';
import { REMOVE_TODO_POMODORO } from 'store/todos/actions/removeTodoPomodoro';
import { ADD_TODO } from 'store/todos/actions/addTodo';
import { SAVE_TODO_TITLE } from 'store/todos/actions/saveTodoTitle';
import { REORDER_TODOS } from 'store/todos/actions/reorderTodos';

// TIMER ACTIONS
import { UPDATE_CURRENT_TODO } from 'store/timer/actions/updateCurrentTodo';
import { SET_STATUS } from 'store/timer/actions/setStatus';
import { INIT_TIMER_TIME } from 'store/timer/actions/initTimerTime';
import { SET_SECONDS } from 'store/timer/actions/setSeconds';
import { SET_MINUTES } from 'store/timer/actions/setMinutes';
import { SET_POMODORO_COUNT } from 'store/timer/actions/setPomodoroCount';
import { SET_BREAK_COUNT } from 'store/timer/actions/setBreakCount';
import { MOVE_TODO_TO_COMPLETED } from 'store/todos/actions/moveTodoToCompleted';

export const rootReducer: Reducer<RootState, Actions> = (state = initialState, action) => {
  switch (action.type) {
    // todos reducer
    case ADD_TODO:
    case DELETE_TODO:
    case ADD_TODO_POMODORO:
    case REMOVE_TODO_POMODORO:
    case SAVE_TODO_TITLE:
    case MOVE_TODO_TO_COMPLETED:
    case REORDER_TODOS:
      return {
        ...state,
        todos: todosReducer(state.todos, action)
      };

    // timer reducer
    case UPDATE_CURRENT_TODO:
    case SET_STATUS:
    case INIT_TIMER_TIME:
    case SET_SECONDS:
    case SET_MINUTES:
    case SET_POMODORO_COUNT:
    case SET_BREAK_COUNT:
      return {
        ...state,
        timer: timerReducer(state.timer, action)
      };

    default:
      return state;
  }
};
