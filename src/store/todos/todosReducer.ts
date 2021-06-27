import { Reducer } from 'redux';
import { TodosState } from 'core/entities/store';
import { TodosActions } from 'store/todos/actions';

import { initialState } from 'store/store';

import { DELETE_TODO } from 'store/todos/actions/deleteTodo';
import { ADD_TODO_POMODORO } from 'store/todos/actions/addTodoPomodoro';
import { REMOVE_TODO_POMODORO } from 'store/todos/actions/removeTodoPomodoro';
import { ADD_TODO } from 'store/todos/actions/addTodo';
import { SAVE_TODO_TITLE } from 'store/todos/actions/saveTodoTitle';
import { REORDER_TODOS } from 'store/todos/actions/reorderTodos';

export const todosReducer: Reducer<TodosState, TodosActions> = (state = initialState.todos, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        list: state.list.concat({ ...action.payload })
      };
    case DELETE_TODO:
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.payload.id)
      };
    case ADD_TODO_POMODORO:
      return {
        ...state,
        list: state.list.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              pomodoroCount: todo.pomodoroCount + 1
            };
          }
          return todo;
        })
      };
    case REMOVE_TODO_POMODORO:
      return {
        ...state,
        list: state.list.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              pomodoroCount: todo.pomodoroCount - 1
            };
          }
          return todo;
        })
      };
    case SAVE_TODO_TITLE:
      return {
        ...state,
        list: state.list.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              title: action.payload.newTitleValue
            };
          }
          return {
            ...todo
          };
        })
      };
    case REORDER_TODOS:
      return {
        ...state,
        // TODO: подумать как сделать без мутации массива
        list: action.payload
      };
    default:
      return state;
  }
};
