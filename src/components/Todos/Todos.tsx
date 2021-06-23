import styles from 'components/Todos/Todos.module.css';

import React from 'react';
import classNames from 'classnames';
import { TodoForm } from 'components/Todos/TodoForm';
import { TodoList } from 'components/Todos/TodoList';

interface TodosProps {
  className?: string;
}

export function Todos({ className }: TodosProps) {
  return (
    <div className={classNames(styles.root, className)}>
      <TodoForm />
      <TodoList />
    </div>
  );
}
