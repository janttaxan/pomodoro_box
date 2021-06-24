import styles from './TodoList.module.css';

import React, { ChangeEvent } from 'react';
import { TodoItem } from 'components/Todos/TodoList/TodoItem';

export function TodoList() {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    ///
  };

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        <TodoItem className={styles.item} title='Сверстать сайт' pomodoroCount={1} onChange={handleChange} />
        <TodoItem title='Проверить валидность' pomodoroCount={5} isEdit onChange={handleChange} />
      </ul>
      <span className={styles.totalTime}>25 мин</span>
    </div>
  );
}
