import styles from './WorkPage.module.css';

import React from 'react';

import { Todos } from 'components/Todos';
import { Info } from 'components/Info';
import { Timer } from 'components/Timer';

export function WorkPage() {
  return (
    <div className={styles.root}>
      <Info className={styles.info} />
      <Todos className={styles.todos} />
      <Timer className={styles.timer} />
    </div>
  );
}
