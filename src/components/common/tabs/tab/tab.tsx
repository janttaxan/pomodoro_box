import style from './tab.module.css';

import { ReactElement } from 'react';

interface TabProps {
  children: ReactElement;
  label: string;
  disabled?: boolean;
}

export function Tab({ children }: TabProps) {
  return <div className={style.root}>{children}</div>;
}
