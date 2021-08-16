import styles from './todo-action.module.css';

import classNames from 'classnames';
import { ReactNode } from 'react';

import { preventHandleMouseDown } from 'core/utils/preventHandleMouseDown';

interface TodoActionProps {
  icon?: ReactNode;
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

export function TodoAction({ icon, text, disabled, onClick }: TodoActionProps) {
  return (
    <li className={styles.root}>
      <button
        className={classNames(styles.btn, { [styles.disabled]: disabled })}
        onClick={onClick}
        onMouseDown={preventHandleMouseDown}
        disabled={disabled}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <span className={styles.text}>{text}</span>
      </button>
    </li>
  );
}
