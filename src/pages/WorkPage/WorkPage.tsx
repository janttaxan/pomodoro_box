import styles from './WorkPage.module.css';

import React from 'react';

import { Layout } from 'components/Layout';
import { Todos } from 'components/Todos';
import { Info } from 'components/Info';

export function WorkPage() {
  return (
    <Layout>
      <div className={styles.root}>
        <Info className={styles.info} />
        <Todos className={styles.todos} />
      </div>
    </Layout>
  );
}
