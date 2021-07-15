import styles from 'components/Todos/Todos.module.css';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useSelector } from 'react-redux';
import { RootState, SettingsState, TodosState } from 'core/entities/store';
import { timeConvert } from 'core/utils/timeConvert';

import { TodoForm } from 'components/Todos/TodoForm';
import { TodoListContainer } from 'components/Todos/TodoListContainer';
import { CompletedTodosList } from 'components/Todos/CompletedTodosList';


interface TodosProps {
  className?: string;
}

export function Todos({ className }: TodosProps) {
  const [totalMunutes, setTotalMunutes] = useState(0);
  const todos = useSelector<RootState, TodosState>((state) => state.todos);
  const settings = useSelector<RootState, SettingsState>((state) => state.settings);

  useEffect(() => {
    const minutes = todos.current.reduce(
      (totalTime, todo) => totalTime + todo.pomodoros * settings.pomodoroTime,
      0
    );

    setTotalMunutes(minutes);
  }, [todos.current]);

  return (
    <section className={classNames(styles.root, className)}>
      <TodoForm />
      <TodoListContainer todos={todos.current} />
      {todos.current.length > 0 && <span className={styles.totalTime}>{timeConvert(totalMunutes)}</span>}

      {todos.completed.length > 0 && (
        <div className={styles.completedTodos}>
          <span className={styles.completedTitle}>Сделано:</span>
          <CompletedTodosList todos={todos.completed} />
        </div>
      )}
    </section>
  );
}
