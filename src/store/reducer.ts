import { Reducer } from 'redux';
import { RootState } from 'core/entities/store';
import { Actions } from 'store/actions';

import { initialState } from 'store/store';

import { todosReducer } from 'store/todos/todosReducer';

import { DELETE_TODO } from 'store/todos/actions/deleteTodo';
import { ADD_TODO_POMODORO } from 'store/todos/actions/addTodoPomodoro';
import { REMOVE_TODO_POMODORO } from 'store/todos/actions/removeTodoPomodoro';
import { ADD_TODO } from 'store/todos/actions/addTodo';
import { SAVE_TODO_TITLE } from 'store/todos/actions/saveTodoTitle';
import { REORDER_TODOS } from 'store/todos/actions/reorderTodos';

export const rootReducer: Reducer<RootState, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
    case DELETE_TODO:
    case ADD_TODO_POMODORO:
    case REMOVE_TODO_POMODORO:
    case SAVE_TODO_TITLE:
    case REORDER_TODOS:
      return {
        ...state,
        todos: todosReducer(state.todos, action)
      };
    default:
      return state;
  }
};
