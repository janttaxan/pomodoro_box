/* eslint-disable @typescript-eslint/unbound-method*/
import styles from './TodoItem.module.css';

import React, { ChangeEvent, FormEvent, MouseEvent, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { IconDots, IconSave } from 'components/common/Icons';
import { Dropdown, useDropdown } from 'components/common/Dropdown';
import { TodoActions } from 'components/Todos/TodoList/TodoItem/TodoActions';
import { TextField } from 'components/common/TextField';
import { Draggable } from 'react-beautiful-dnd';

export interface TodoItemProps {
  className?: string;
  id: string;
  index: number;
  pomodoroCount: number;
  title: string;
  onSaveTitle: (id: string, newValue: string) => void;
  onAddPomodoro: (id: string) => void;
  onRemovePomodoro: (id: string) => void;
  onEditTodo?: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoItem(props: TodoItemProps) {
  const {
    className,
    id,
    index,
    title,
    onSaveTitle,
    pomodoroCount,
    onAddPomodoro,
    onRemovePomodoro,
    onEditTodo,
    onDeleteTodo
  } = props;

  const [titleValue, setTitleValue] = useState(title);
  const [isEdit, toggleIsEdit] = useState(false);
  const [errorValue, setErrorValue] = useState('');

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

  const handleAddPomodoro = useCallback(() => {
    onAddPomodoro(id);
  }, []);

  const handleRemovePomodoro = useCallback(() => {
    onRemovePomodoro(id);
  }, []);

  const handleEditTask = useCallback(() => {
    if (onEditTodo) {
      onEditTodo(id);
    }
    toggleIsEdit(true);
    focusInput();
    onClose();
  }, []);

  const handleDeleteTask = useCallback(() => {
    onDeleteTodo(id);
    onClose();
  }, []);

  const handleChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (errorValue && event.target.value.length > 3) {
      setErrorValue('');
    }

    setTitleValue(event.target.value);
  }, [errorValue]);

  const handleSaveTitle = (event: FormEvent) => {
    event.preventDefault();
    if (titleValue.length > 3) {
      onSaveTitle(id, titleValue.trim());
      setTitleValue(titleValue.trim());
      toggleIsEdit(false);
    } else {
      setErrorValue('Введите больше трех символов');
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <li
          className={classNames(styles.root, className, { [styles.itemEdit]: isEdit })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <form className={classNames(styles.task, { [styles.taskEdit]: isEdit })} onSubmit={handleSaveTitle}>
            <button
              className={styles.pomodoroCount}
              onClick={handleAddPomodoro}
              onMouseDown={handleMouseDown}
              type='button'
            >
              {pomodoroCount}
            </button>
            <TextField
              className={styles.title}
              fieldClassName={classNames(styles.input, { [styles.inputEdit]: isEdit })}
              size='sm'
              value={titleValue}
              onChange={handleChangeTitle}
              disabled={!isEdit}
              errorValue={isEdit && errorValue ? errorValue : ''}
              ref={inputRef}
            />
            {isEdit && (
              <button className={styles.saveBtn} onMouseDown={handleMouseDown}>
                <IconSave />
              </button>
            )}
          </form>
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
      )}
    </Draggable>
  );
}
