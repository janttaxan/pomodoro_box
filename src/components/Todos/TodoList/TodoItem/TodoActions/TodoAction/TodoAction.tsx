import styles from './TodoAction.module.css';

import React, { MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';

interface TodoActionProps {
  icon?: ReactNode;
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

export function TodoAction({ icon, text, disabled, onClick }: TodoActionProps) {
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <li className={styles.root}>
      <button
        className={classNames(styles.btn, { [styles.disabled]: disabled })}
        onClick={onClick}
        onMouseDown={handleMouseDown}
        disabled={disabled}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <span className={styles.text}>{text}</span>
      </button>
    </li>
  );
}
