import styles from './TimerHeader.module.css';

import React from 'react';
import classNames from 'classnames';
import { TimerStatus } from 'core/entities/store';

interface TimerHeaderProps {
  todoTitle?: string;
  pomodoroCount: number;
  breakCount: number;
  status: TimerStatus;
}

export function TimerHeader({ todoTitle, pomodoroCount, breakCount, status }: TimerHeaderProps) {
  const headerClasses = classNames(styles.root, styles[status]);
  return (
    <div className={headerClasses}>
      <div className={styles.left}>
        {status === 'noTask' ? (
          <h4 className={styles.title}>Нет задачи</h4>
        ) : (
          <h4 className={styles.title}>{todoTitle}</h4>
        )}
      </div>
      {status !== 'noTask' && (
        <div className={styles.right}>
          {(status === 'work' || status === 'pauseWork' || status === 'default') && (
            <span className={styles.count}>Помидор #{pomodoroCount}</span>
          )}
          {(status === 'break' || status === 'pauseBreak') && (
            <span className={styles.count}>Перерыв #{breakCount}</span>
          )}
        </div>
      )}
    </div>
  );
}
