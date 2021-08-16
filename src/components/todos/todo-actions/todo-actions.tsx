import styles from './todo-actions.module.css';

import { ReactNode, useRef } from 'react';

import { Dropdown, useDropdown } from 'components/common/dropdown/dropdown';
import IconDots from 'components/common/icons/dots.svg';

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
