import styles from './layout.module.css';

import { ReactChild } from 'react';
import { Header } from 'components/layout/header/header';

interface LayoutProps {
  children?: ReactChild;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.root}>
      <Header className={styles.header} />
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};
