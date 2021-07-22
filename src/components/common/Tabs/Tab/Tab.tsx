import style from './Tab.module.css';

import React, { ReactElement } from 'react';

interface TabProps {
  children: ReactElement;
  label: string;
  disabled?: boolean;
}

export function Tab({ children }: TabProps) {
  return <div className={style.root}>{children}</div>;
}
