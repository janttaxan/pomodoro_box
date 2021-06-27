import styles from 'components/Todos/Todos.module.css';

import React from 'react';
import classNames from 'classnames';

import { useSelector } from 'react-redux';
import { RootState } from 'core/entities/store';
import { Todo } from 'core/entities/todo';

import { TodoForm } from 'components/Todos/TodoForm';
import { TodoListContainer } from 'components/Todos/TodoListContainer';

interface TodosProps {
  className?: string;
}

export function Todos({ className }: TodosProps) {
  const todosList = useSelector<RootState, Array<Todo>>((state) => state.todos.list);
  return (
    <section className={classNames(styles.root, className)}>
      <TodoForm />
      <TodoListContainer />
      {todosList.length > 0 && <span className={styles.totalTime}>25 мин</span>}
    </section>
  );
}
