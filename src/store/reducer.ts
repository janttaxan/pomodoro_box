import { Reducer } from 'redux';
import { RootState } from 'core/entities/store';
import { Actions } from 'store/actions';

import { initialState } from 'store/store';

import { DELETE_TODO } from 'store/todos/actions/deleteTodo';
import { todosReducer } from 'store/todos/todosReducer';

export const rootReducer: Reducer<RootState, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_TODO:
      return {
        ...state,
        todos: todosReducer(state.todos, action)
      };
    default:
      return state;
  }
};
