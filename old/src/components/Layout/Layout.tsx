import styles from 'components/Layout/Layout.module.css';

import React, { ReactNode } from 'react';
import { Header } from 'components/Layout/Header';
import { Content } from 'components/Layout/Content';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.root}>
      <Header className={styles.header} />
      <Content className={styles.content}>{children}</Content>
    </div>
  );
}
