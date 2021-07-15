import styles from './Logo.module.css';

import React from 'react';
import { preventHandleMouseDown } from 'core/utils/preventHandleMouseDown';

import { IconLogo } from 'components/common/Icons';

export const Logo = () => {
  return (
    <a className={styles.root} href='/' onMouseDown={preventHandleMouseDown}>
      <IconLogo />
      <span className={styles.text}>pomodoro_box</span>
    </a>
  );
};
