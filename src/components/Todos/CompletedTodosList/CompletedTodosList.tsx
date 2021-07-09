import styles from './CompletedTodosList.module.css';

import React from 'react';

import { Todo } from 'core/entities/todo';
import { CompletedTodoItem } from 'components/Todos/CompletedTodosList/CompletedTodoItem/CompletedTodoItem';

interface CompletedTodosListProps {
  todos: Array<Todo>;
}

export function CompletedTodosList({ todos }: CompletedTodosListProps) {
  return (
    <ul className={styles.root}>
      {todos.map((todo) => (
        <CompletedTodoItem className={styles.item} key={todo.id} title={todo.title} />
      ))}
    </ul>
  );
}
