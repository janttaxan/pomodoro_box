import styles from './Logo.module.css';

import React, { MouseEvent } from 'react';
import { IconLogo } from 'components/common/Icons';

export const Logo = () => {
  const handleMouseDown = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  return (
    <a className={styles.root} href='/' onMouseDown={(event) => handleMouseDown(event)}>
      <IconLogo />
      <span className={styles.text}>pomodoro_box</span>
    </a>
  );
};
