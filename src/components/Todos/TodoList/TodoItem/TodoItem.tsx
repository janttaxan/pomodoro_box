import styles from './TodoItem.module.css';

import React, { ChangeEvent, MouseEvent, useRef } from 'react';
import classNames from 'classnames';
import { IconDots, IconSave } from 'components/common/Icons';
import { Dropdown, useDropdown } from 'components/common/Dropdown';

interface TodoItemProps {
  className?: string;
  title: string;
  pomodoroCount: number;
  isEdit?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function TodoItem({ className, title, pomodoroCount, isEdit = false, onChange }: TodoItemProps) {
  const dropdownRef = useRef(null);
  const { onOpen, onClose, opened } = useDropdown(dropdownRef);

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <li className={classNames(styles.root, className)}>
      <div className={styles.task}>
        <span className={styles.pomodoroCount}>{pomodoroCount}</span>
        <input className={styles.title} value={title} onChange={onChange} disabled={!isEdit} />
        {isEdit && (
          <button className={styles.saveBtn} onMouseDown={handleMouseDown}>
            <IconSave />
          </button>
        )}
      </div>
      <div className={styles.actions}>
        <button className={styles.actionsBtn} onClick={onOpen}>
          <IconDots />
        </button>
        <Dropdown className={styles.dropdown} opened={opened} ref={dropdownRef}>
          qwdq <br />
          qwdq <br />
          wdqwdqwd
        </Dropdown>
      </div>
    </li>
  );
}
