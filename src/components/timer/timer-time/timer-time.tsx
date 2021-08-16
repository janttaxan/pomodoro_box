import styles from './timer-time.module.css';

import classNames from 'classnames';

import { preventHandleMouseDown } from 'core/utils/preventHandleMouseDown';
import { TimerStatus } from 'core/entities/timer';

import IconPlus from 'components/common/icons/plus.svg';

interface TimerTimeProps {
  minute: number;
  second: number;
  status: TimerStatus;
  onAddMinute: () => void;
}

export function TimerTime({ minute, second, status, onAddMinute }: TimerTimeProps) {
  function formatTimeNumber(value: number): string {
    if (value < 10) {
      return `0${value}`;
    }

    return `${value}`;
  }

  return (
    <div className={classNames(styles.root, styles[status])}>
      <div className={styles.wrapper}>
        <div className={styles.time}>
          <span className={styles.timeNum}>{formatTimeNumber(minute)}</span>
          <div className={styles.timeSeparate} />
          <span className={styles.timeNum}>{formatTimeNumber(second)}</span>
        </div>
        {(
          status === TimerStatus.work ||
          status === TimerStatus.pauseWork ||
          status === TimerStatus.break ||
          status === TimerStatus.pauseBreak
        ) && (
          <button className={styles.addBtn} onClick={onAddMinute} onMouseDown={preventHandleMouseDown}>
            <IconPlus />
          </button>
        )}
      </div>
    </div>
  );
}
