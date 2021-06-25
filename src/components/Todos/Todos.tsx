import styles from 'components/Todos/Todos.module.css';

import React from 'react';
import classNames from 'classnames';
import { TodoForm } from 'components/Todos/TodoForm';
import { TodoListContainer } from 'components/Todos/TodoListContainer';

interface TodosProps {
  className?: string;
}

export function Todos({ className }: TodosProps) {
  return (
    <div className={classNames(styles.root, className)}>
      <TodoForm />
      <TodoListContainer />
    </div>
  );
}
