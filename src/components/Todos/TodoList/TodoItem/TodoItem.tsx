// TODO: почистить исключения
/* eslint-disable @typescript-eslint/unbound-method*/
import styles from './TodoItem.module.css';

import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { preventHandleMouseDown } from 'utils/preventHandleMouseDown';

import { IconAdd, IconDelete, IconEdit, IconRemove, IconSave } from 'components/common/Icons';

import { TextField } from 'components/common/TextField';
import { TodoAction } from 'components/Todos/TodoActions/TodoAction';
import { TodoActions } from 'components/Todos/TodoActions';

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

  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
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
  }, []);

  const handleDeleteTask = useCallback(() => {
    onDeleteTodo(id);
  }, []);

  const handleChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (errorValue && event.target.value.length > 3) {
        setErrorValue('');
      }

      setTitleValue(event.target.value);
    },
    [errorValue]
  );

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

  const itemClasses = classNames(styles.root, className, { [styles.itemEdit]: isEdit });

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li className={itemClasses} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <form className={classNames(styles.task, { [styles.taskEdit]: isEdit })} onSubmit={handleSaveTitle}>
            <button
              className={styles.pomodoroCount}
              onClick={handleAddPomodoro}
              onMouseDown={preventHandleMouseDown}
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
              <button className={styles.saveBtn} onMouseDown={preventHandleMouseDown}>
                <IconSave />
              </button>
            )}
          </form>
          {!isEdit && (
            <TodoActions>
              <TodoAction
                icon={<IconAdd />}
                text='Увеличить'
                onClick={handleAddPomodoro}
              />
              <TodoAction
                icon={<IconRemove />}
                text='Уменьшить'
                onClick={handleRemovePomodoro}
                disabled={pomodoroCount <= 1}
              />
              <TodoAction
                icon={<IconEdit />}
                text='Редактировать'
                onClick={handleEditTask}
                disabled={isEdit}
              />
              <TodoAction
                icon={<IconDelete />}
                text='Удалить'
                onClick={handleDeleteTask}
              />
            </TodoActions>
          )}
        </li>
      )}
    </Draggable>
  );
}
