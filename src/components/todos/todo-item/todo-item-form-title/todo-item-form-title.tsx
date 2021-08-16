import styles from './todo-item-form-title.module.css';

import classNames from 'classnames';
import { ChangeEvent, FormEvent, forwardRef } from 'react';

import { NOOP } from 'core/utils/NOOP';
import { preventHandleMouseDown } from 'core/utils/preventHandleMouseDown';

import { TextField } from 'components/common/text-field/text-field';
import IconSave from 'components/common/icons/save.svg';

interface TodoItemFormTitleProps {
  isDone?: boolean;
  titleValue: string;
  pomodoroCount?: number;
  isEdit?: boolean;
  errorValue?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onChangeTitle?: (event: ChangeEvent<HTMLInputElement>) => void;
  onAddPomodoro?: () => void;
}

export const TodoItemFormTitle = forwardRef<HTMLInputElement, TodoItemFormTitleProps>((props, ref) => {
  const {
    isDone = false,
    titleValue,
    pomodoroCount,
    isEdit,
    errorValue,
    onSubmit = NOOP,
    onChangeTitle = NOOP,
    onAddPomodoro = NOOP
  } = props;
  return (
    <form className={classNames(styles.task, { [styles.taskEdit]: isEdit })} onSubmit={onSubmit}>
      {!isDone && (
        <button
          className={styles.pomodoroCount}
          onClick={onAddPomodoro}
          onMouseDown={preventHandleMouseDown}
          type='button'
        >
          {pomodoroCount}
        </button>
      )}
      <TextField
        className={styles.title}
        fieldClassName={classNames(styles.input, { [styles.inputEdit]: isEdit })}
        size='sm'
        value={titleValue}
        onChange={onChangeTitle}
        disabled={!isEdit}
        errorValue={isEdit && errorValue ? errorValue : ''}
        ref={ref}
      />
      {isEdit && (
        <button className={styles.saveBtn} onMouseDown={preventHandleMouseDown}>
          <IconSave />
        </button>
      )}
    </form>
  );
});
