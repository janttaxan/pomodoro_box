import styles from 'components/Todos/Todos.module.css';

import React from 'react';
import classNames from 'classnames';

import { useSelector } from 'react-redux';
import { RootState, TodosState } from 'core/entities/store';

import { TodoForm } from 'components/Todos/TodoForm';
import { TodoListContainer } from 'components/Todos/TodoListContainer';

interface TodosProps {
  className?: string;
}

export function Todos({ className }: TodosProps) {
  const todos = useSelector<RootState, TodosState>((state) => state.todos);

  return (
    <section className={classNames(styles.root, className)}>
      <TodoForm />
      <TodoListContainer />
      {todos.current.length > 0 && <span className={styles.totalTime}>25 мин</span>}

      <div className={styles.completedTodos}>
        <TodoListContainer />
      </div>
    </section>
  );
}
