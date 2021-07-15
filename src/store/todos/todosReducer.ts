// TODO: почистить исключения
/* eslint-disable @typescript-eslint/restrict-plus-operands */

import { Reducer } from 'redux';
import { TodosState } from 'core/entities/store';
import { TodosActions } from 'store/todos/actions';

import { generateRandomString } from 'core/utils/generateRandomString';

import { initialState } from 'store/store';

import { DELETE_TODO } from 'store/todos/actions/deleteTodo';
import { ADD_TODO_POMODORO } from 'store/todos/actions/addTodoPomodoro';
import { REMOVE_TODO_POMODORO } from 'store/todos/actions/removeTodoPomodoro';
import { ADD_TODO } from 'store/todos/actions/addTodo';
import { SAVE_TODO_TITLE } from 'store/todos/actions/saveTodoTitle';
import { REORDER_TODOS } from 'store/todos/actions/reorderTodos';
import { MOVE_TODO_TO_COMPLETED } from 'store/todos/actions/moveTodoToCompleted';


export const todosReducer: Reducer<TodosState, TodosActions> = (state = initialState.todos, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        current: state.current.concat({ ...action.payload })
      };
    case DELETE_TODO:
      return {
        ...state,
        current: state.current.filter((todo) => todo.id !== action.payload.id)
      };
    case ADD_TODO_POMODORO:
      return {
        ...state,
        current: state.current.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              pomodoros: todo.pomodoros + 1
            };
          }
          return todo;
        })
      };
    case REMOVE_TODO_POMODORO:
      return {
        ...state,
        current: state.current.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              pomodoros: todo.pomodoros - 1
            };
          }
          return todo;
        })
      };
    case SAVE_TODO_TITLE:
      return {
        ...state,
        current: state.current.map((todo) => {
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
    case MOVE_TODO_TO_COMPLETED:
      return {
        ...state,
        completed: state.completed.concat({
          ...action.payload,
          pomodoros: 0,
          id: generateRandomString(),
          date: { ...action.payload.date, complited: Date.now() }
        })
      };
    case REORDER_TODOS:
      return {
        ...state,
        // TODO: подумать как сделать без мутации массива
        current: action.payload
      };
    default:
      return state;
  }
};
