import { Reducer } from 'redux';
import { TodosState } from 'core/entities/store';
import { TodosActions } from 'store/todos/actions';
import { initialState } from 'store/store';

export const todosReducer: Reducer<TodosState, TodosActions> = (state = initialState.todos, action) => {
  switch (action.type) {
    case 'DELETE_TODO':
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.payload.id)
      };
    default:
      return state;
  }
};
