import styles from './TimerTime.module.css';

import React from 'react';
import classNames from 'classnames';
import { preventHandleMouseDown } from 'utils/preventHandleMouseDown';
import { TimerStatus } from 'core/entities/store';

import { IconPlus } from 'components/common/Icons';

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
        {status !== 'noTask' && (
          <button
            className={styles.addBtn}
            onClick={onAddMinute}
            onMouseDown={preventHandleMouseDown}
          >
            <IconPlus />
          </button>
        )}
      </div>
    </div>
  );
}
