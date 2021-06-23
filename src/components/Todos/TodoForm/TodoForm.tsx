import styles from './TodoForm.module.css';

import React from 'react';
import { Button } from 'components/common/Button';

export function TodoForm() {
  return (
    <div className={styles.root}>
      <Button text='Добавить' />
    </div>
  );
}
