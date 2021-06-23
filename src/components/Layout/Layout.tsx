import styles from './Layout.module.css';

import React, { ReactNode } from 'react';
import { Header } from 'components/Layout/Header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.root}>
      <Header className={styles.header} />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
