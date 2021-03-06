import { DeleteTodo } from 'store/todos/actions/deleteTodo';
import { AddTodoPomodoro } from 'store/todos/actions/addTodoPomodoro';
import { RemoveTodoPomodoro } from 'store/todos/actions/removeTodoPomodoro';
import { AddTodo } from 'store/todos/actions/addTodo';
import { SaveTodoTitle } from 'store/todos/actions/saveTodoTitle';
import { ReorderTodos } from 'store/todos/actions/reorderTodos';
import { MoveTodoToCompleted } from 'store/todos/actions/moveTodoToCompleted';

export type TodosActions =
  | AddTodo
  | DeleteTodo
  | AddTodoPomodoro
  | RemoveTodoPomodoro
  | SaveTodoTitle
  | ReorderTodos
  | MoveTodoToCompleted;
