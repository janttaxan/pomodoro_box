import styles from 'components/Todos/TodoActions/TodoActions.module.css';

import React, { ReactNode, useRef } from 'react';
import { IconDots } from 'components/common/Icons';
import { Dropdown, useDropdown } from 'components/common/Dropdown';

interface TodoActionsProps {
  children: ReactNode;
}

export function TodoActions({ children }: TodoActionsProps) {
  const dropdownRef = useRef(null);
  const { onOpen, opened } = useDropdown(dropdownRef);

  return (
    <div className={styles.root}>
      <button className={styles.actionsBtn} onClick={onOpen}>
        <IconDots />
      </button>
      <Dropdown className={styles.dropdown} opened={opened} ref={dropdownRef}>
        <ul className={styles.actionsList}>
          {children}
        </ul>
      </Dropdown>
    </div>
  );
}
