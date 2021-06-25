import React, { ChangeEvent, useCallback } from 'react';

import { RootState } from 'core/entities/store';
import { useDispatch, useSelector } from 'react-redux';

import { TodoList } from 'components/Todos/TodoList';
import { Todo } from 'core/entities/todo';
import { deleteTodo } from 'store/todos/actions/deleteTodo';

export function TodoListContainer() {
  const dispatch = useDispatch();

  const todosList = useSelector<RootState, Array<Todo>>((state) => state.todos.list);

  const handleChangeTodoTitle = useCallback((id: string, event: ChangeEvent<HTMLInputElement>) => {
    console.log(id, `ред: ${event.target.value}`);
  }, []);

  const handleSaveTodoTitle = useCallback((id: string) => {
    console.log(id, 'save');
  }, []);

  const handleAddTodoPomodoro = useCallback((id: string) => {
    console.log(id, 'add pom');
  }, []);

  const handleRemoveTodoPomodoro = useCallback((id: string) => {
    console.log(id, 'remove pom');
  }, []);

  const handleEditTodo = useCallback((id: string) => {
    console.log(id, 'edit');
  }, []);

  const handleDeleteTodo = useCallback((id: string) => {
    dispatch(deleteTodo({ id }));
  }, []);


  return (
    <TodoList
      todos={todosList}
      onChangeTodoTitle={handleChangeTodoTitle}
      onSaveTodoTitle={handleSaveTodoTitle}
      onAddTodoPomodoro={handleAddTodoPomodoro}
      onRemoveTodoPomodoro={handleRemoveTodoPomodoro}
      onEditTodo={handleEditTodo}
      onDeleteTodo={handleDeleteTodo}
    />
  );
}
