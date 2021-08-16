import style from './tab-title.module.css';

import classNames from 'classnames';
import { useCallback } from 'react';

import { preventHandleMouseDown } from 'core/utils/preventHandleMouseDown';

export interface TabTitleProps {
  label: string;
  index: number;
  setSelectedTab: (index: number) => void;
  active?: boolean;
  disabled?: boolean;
}

export function TabTitle({ label, index, setSelectedTab, active = false, disabled = false }: TabTitleProps) {
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <li className={classNames(style.root, { [style.active]: active }, { [style.disabled]: disabled })}>
      <button className={style.btn} onClick={onClick} disabled={disabled} onMouseDown={preventHandleMouseDown}>
        {label}
      </button>
    </li>
  );
}
