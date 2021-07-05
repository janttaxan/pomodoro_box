import styles from './WorkPage.module.css';

import React from 'react';

import { Todos } from 'components/Todos';
import { Info } from 'components/Info';
import { TimerContainer } from 'components/TimerContainer/TimerContainer';

export function WorkPage() {
  return (
    <div className={styles.root}>
      <Info className={styles.info} />
      <Todos className={styles.todos} />
      <TimerContainer className={styles.timer} />
    </div>
  );
}
