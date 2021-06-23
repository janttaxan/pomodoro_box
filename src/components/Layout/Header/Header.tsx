import styles from './Header.module.css';

import React, { MouseEvent } from 'react';
import classNames from 'classnames';

import { Logo } from 'components/Layout/Header/Logo/Logo';
import { IconEqualizer } from 'components/common/Icons/IconEqualizer';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const handleMouseDown = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  return (
    <header className={classNames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <a className={styles.link} href='/' onMouseDown={(event) => handleMouseDown(event)}>
            <IconEqualizer />
            <span className={styles.linkText}>Статистика</span>
          </a>
        </div>
      </div>
    </header>
  );
}
