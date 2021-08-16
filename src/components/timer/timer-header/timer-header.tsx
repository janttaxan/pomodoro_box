import styles from './timer-header.module.css';

import classNames from 'classnames';

import { TimerStatus } from 'core/entities/timer';

interface TimerHeaderProps {
  todoTitle?: string;
  pomodoroCount: number;
  breakCount: number;
  status: TimerStatus;
}

export function TimerHeader({ todoTitle, pomodoroCount, breakCount, status }: TimerHeaderProps) {
  return (
    <div className={classNames(styles.root, styles[status])}>
      <div className={styles.left}>
        {status === TimerStatus.noTask ? (
          <h4 className={styles.title}>Список задач пуст</h4>
        ) : (
          <h4 className={styles.title}>{todoTitle}</h4>
        )}
      </div>
      {status !== TimerStatus.noTask && (
        <div className={styles.right}>
          {(status === TimerStatus.work || status === TimerStatus.pauseWork || status === TimerStatus.default) && (
            <span className={styles.count}>Помидор #{pomodoroCount}</span>
          )}
          {(status === TimerStatus.break || status === TimerStatus.pauseBreak) && (
            <span className={styles.count}>Перерыв #{breakCount}</span>
          )}
        </div>
      )}
    </div>
  );
}
