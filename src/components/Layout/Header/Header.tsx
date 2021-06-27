import styles from './Header.module.css';

import React from 'react';
import classNames from 'classnames';
import { preventHandleMouseDown } from 'utils/preventHandleMouseDown';

import { Logo } from 'components/Layout/Header/Logo/Logo';
import { IconEqualizer } from 'components/common/Icons';
import { LocalStorageService } from 'core/services/localStorage';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const lsService = new LocalStorageService();

  const handleResetStore = () => {
    lsService.resetStore();
  };
  return (
    <header className={classNames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <button onClick={handleResetStore}>сбросить хранилище</button>
          <a className={styles.link} href='/' onMouseDown={preventHandleMouseDown}>
            <IconEqualizer />
            <span className={styles.linkText}>Статистика</span>
          </a>
        </div>
      </div>
    </header>
  );
}
