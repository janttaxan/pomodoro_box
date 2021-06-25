import style from './TodoActions.module.css';

import React from 'react';
import { TodoAction } from 'components/Todos/TodoList/TodoItem/TodoActions/TodoAction';
import { IconAdd, IconDelete, IconEdit, IconRemove } from 'components/common/Icons';

interface TodoActionsProps {
  addPomodoroIsDisabled?: boolean;
  removePomodoroIsDisabled?: boolean;
  editTaskIsDisabled?: boolean;
  deleteTaskIsDisabled?: boolean;

  onAddPomodoro: () => void;
  onRemovePomodoro: () => void;
  onEditTodo: () => void;
  onDeleteTodo: () => void;
}

export function TodoActions(props: TodoActionsProps) {
  const {
    addPomodoroIsDisabled = false,
    removePomodoroIsDisabled = false,
    editTaskIsDisabled = false,
    deleteTaskIsDisabled = false,
    onAddPomodoro,
    onRemovePomodoro,
    onEditTodo,
    onDeleteTodo
  } = props;

  return (
    <ul className={style.root}>
      <TodoAction icon={<IconAdd />} text='Увеличить' onClick={onAddPomodoro} disabled={addPomodoroIsDisabled} />
      <TodoAction
        icon={<IconRemove />}
        text='Уменьшить'
        onClick={onRemovePomodoro}
        disabled={removePomodoroIsDisabled}
      />
      <TodoAction icon={<IconEdit />} text='Редактировать' onClick={onEditTodo} disabled={editTaskIsDisabled} />
      <TodoAction icon={<IconDelete />} text='Удалить' onClick={onDeleteTodo} disabled={deleteTaskIsDisabled} />
    </ul>
  );
}
