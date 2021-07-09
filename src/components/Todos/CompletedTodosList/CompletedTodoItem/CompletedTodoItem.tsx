import styles from './CompletedTodoItem.module.css';

import React from 'react';
import { TodoActions } from 'components/Todos/TodoActions';
import { TodoAction } from 'components/Todos/TodoActions/TodoAction';
import classNames from 'classnames';

interface CompletedTodoItemProps {
  className?: string;
  title: string;
}

export function CompletedTodoItem({ className, title }: CompletedTodoItemProps) {
  return (
    <li className={classNames(styles.root, className)}>
      <span className={styles.title}>{title}</span>
      <TodoActions>
        <TodoAction text='Повторить' onClick={console.log} />
        <TodoAction text='Удалить' onClick={console.log} />
      </TodoActions>
    </li>
  );
}
