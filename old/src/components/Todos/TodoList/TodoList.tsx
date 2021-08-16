// TODO: почистить исключения
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import styles from 'components/Todos/TodoList/TodoList.module.css';

import React from 'react';
import { Todo } from 'core/entities/todo';

import { TodoItem } from 'components/Todos/TodoItem';

interface TodoListProps {
  todos: Array<Todo>;
  onSaveTodoTitle: (id: string, newTitleValue: string) => void;
  onAddTodoPomodoro: (id: string) => void;
  onRemoveTodoPomodoro: (id: string) => void;
  onEditTodo?: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoList(props: TodoListProps) {
  const { todos, onSaveTodoTitle, onAddTodoPomodoro, onRemoveTodoPomodoro, onEditTodo, onDeleteTodo } = props;

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {todos.map((todo, index) => (
          <TodoItem
            className={styles.item}
            key={todo.id}
            id={todo.id}
            index={index}
            pomodoroCount={todo.pomodoros}
            title={todo.title}
            onSaveTitle={onSaveTodoTitle}
            onAddPomodoro={onAddTodoPomodoro}
            onRemovePomodoro={onRemoveTodoPomodoro}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
