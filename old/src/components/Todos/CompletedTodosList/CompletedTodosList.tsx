import styles from 'components/Todos/CompletedTodosList/CompletedTodosList.module.css';

import React from 'react';

import { Todo } from 'core/entities/todo';
import { TodoItem } from 'components/Todos/TodoItem';

interface CompletedTodosListProps {
  todos: Array<Todo>;
}

export function CompletedTodosList({ todos }: CompletedTodosListProps) {
  return (
    <ul className={styles.root}>
      {todos.map((todo) => (
        <TodoItem
          className={styles.item}
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isDone
          onDeleteTodo={console.log}
        />
      ))}
    </ul>
  );
}
