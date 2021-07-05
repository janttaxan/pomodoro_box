import styles from './TodosCompletedList.module.css';

import React from 'react';

import { Todo } from 'core/entities/todo';

interface TodosCompletedListProps {
  list: Array<Todo>;
}

export function TodosCompletedList({ list }: TodosCompletedListProps) {
  return (
    <ul className={styles.root}>
      {list.map((todo) => (
        <div>{todo.title}</div>
      ))}
    </ul>
  );
}
