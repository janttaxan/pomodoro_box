import styles from './TimerInfo.module.css';

import React from 'react';

interface TimerInfoProps {
  hasTodo: boolean;
  todoTitle?: string;
}

export function TimerInfo({ hasTodo, todoTitle }: TimerInfoProps) {
  return (
    <div className={styles.root}>
      {hasTodo ? (
        <>
          <span className={styles.infoProp}>Задача &mdash; </span>
          <span>{todoTitle}</span>
        </>
      ) : (
        <span className={styles.noTodosInfo}>Чтобы начать работу, добавьте новую задачу</span>
      )}
    </div>
  );
}
