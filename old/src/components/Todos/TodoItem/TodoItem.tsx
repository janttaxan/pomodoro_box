// TODO: почистить исключения
/* eslint-disable @typescript-eslint/unbound-method*/
import styles from 'components/Todos/TodoItem/TodoItem.module.css';

import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { NOOP } from 'core/utils/NOOP';

import { IconAdd, IconDelete, IconEdit, IconRemove } from 'components/common/Icons';
import { TodoAction } from 'components/Todos/TodoActions/TodoAction';
import { TodoActions } from 'components/Todos/TodoActions';
import { TodoItemFormTitle } from 'components/Todos/TodoItem/TodoItemFormTitle';

export interface TodoItemProps {
  className?: string;
  id: string;
  index?: number;
  pomodoroCount?: number;
  title: string;
  isDone?: boolean;
  onSaveTitle?: (id: string, newValue: string) => void;
  onAddPomodoro?: (id: string) => void;
  onRemovePomodoro?: (id: string) => void;
  onEditTodo?: (id: string) => void;
  onDeleteTodo?: (id: string) => void;
}

export function TodoItem(props: TodoItemProps) {
  const {
    className,
    id,
    index,
    title,
    isDone = false,
    pomodoroCount,
    onSaveTitle = NOOP,
    onAddPomodoro = NOOP,
    onRemovePomodoro = NOOP,
    onEditTodo = NOOP,
    onDeleteTodo = NOOP
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

  const handleSaveTitle = useCallback((event: FormEvent) => {
    event.preventDefault();
    if (onSaveTitle && titleValue.length > 3) {
      onSaveTitle(id, titleValue.trim());
      setTitleValue(titleValue.trim());
      toggleIsEdit(false);
    } else {
      setErrorValue('Введите больше трех символов');
    }
  }, [titleValue]);

  const itemClasses = classNames(styles.root, className, { [styles.itemEdit]: isEdit });

  if (isDone) {
    return (
      <li className={itemClasses}>
        <TodoItemFormTitle
          titleValue={titleValue}
          isDone
        />
        <TodoActions>
          <TodoAction
            icon={<IconDelete />}
            text='Удалить'
            onClick={handleDeleteTask}
          />
        </TodoActions>
      </li>
    );
  }

  return (
    <Draggable draggableId={id} index={index ? index : 0}>
      {(provided) => (
        <li className={itemClasses} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <TodoItemFormTitle
            ref={inputRef}
            titleValue={titleValue}
            pomodoroCount={pomodoroCount ? pomodoroCount : 0}
            isEdit={isEdit}
            errorValue={isEdit && errorValue ? errorValue : ''}
            onSubmit={handleSaveTitle}
            onChangeTitle={handleChangeTitle}
            onAddPomodoro={handleAddPomodoro}
          />
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
                disabled={pomodoroCount ? pomodoroCount <= 1 : true}
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
