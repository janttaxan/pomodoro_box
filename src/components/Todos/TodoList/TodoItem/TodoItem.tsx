import styles from './TodoItem.module.css';

import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import { IconDots, IconSave } from 'components/common/Icons';
import { Dropdown, useDropdown } from 'components/common/Dropdown';
import { TodoActions } from 'components/Todos/TodoList/TodoItem/TodoActions';

interface TodoItemProps {
  className?: string;
  id: string;
  pomodoroCount: number;
  title: string;
  onChangeTitle: (id: string, event: ChangeEvent<HTMLInputElement>) => void;
  onSaveTitle: (id: string) => void;
  onAddPomodoro: (id: string) => void;
  onRemovePomodoro: (id: string) => void;
  onEditTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoItem(props: TodoItemProps) {
  const {
    className,
    id,
    title,
    onChangeTitle,
    onSaveTitle,
    pomodoroCount,
    onAddPomodoro,
    onRemovePomodoro,
    onEditTodo,
    onDeleteTodo
  } = props;

  const [isEdit, toggleIsEdit] = useState(false);

  const dropdownRef = useRef(null);
  const { onOpen, onClose, opened } = useDropdown(dropdownRef);

  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleAddPomodoro = () => {
    onAddPomodoro(id);
    onClose();
  };

  const handleRemovePomodoro = () => {
    onRemovePomodoro(id);
    onClose();
  };

  const handleEditTask = () => {
    onEditTodo(id);
    toggleIsEdit(true);
    focusInput();
    onClose();
  };

  const handleDeleteTask = () => {
    onDeleteTodo(id);
    onClose();
  };

  const handleSaveTitle = () => {
    toggleIsEdit(false);
    onSaveTitle(id);
  };

  return (
    <li className={classNames(styles.root, className)}>
      <div className={styles.task}>
        <span className={styles.pomodoroCount}>{pomodoroCount}</span>
        <input
          className={styles.title}
          value={title}
          onChange={(event) => onChangeTitle(id, event)}
          ref={inputRef}
          disabled={!isEdit}
        />
        {isEdit && (
          <button className={styles.saveBtn} onClick={handleSaveTitle} onMouseDown={handleMouseDown}>
            <IconSave />
          </button>
        )}
      </div>
      {!isEdit && (
        <div className={styles.actions}>
          <button className={styles.actionsBtn} onClick={onOpen}>
            <IconDots />
          </button>
          <Dropdown className={styles.dropdown} opened={opened} ref={dropdownRef}>
            <TodoActions
              removePomodoroIsDisabled={pomodoroCount <= 1}
              editTaskIsDisabled={isEdit}

              onAddPomodoro={handleAddPomodoro}
              onRemovePomodoro={handleRemovePomodoro}
              onEditTodo={handleEditTask}
              onDeleteTodo={handleDeleteTask}
            />
          </Dropdown>
        </div>
      )}
    </li>
  );
}
