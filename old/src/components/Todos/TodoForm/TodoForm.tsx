import styles from 'components/Todos/TodoForm/TodoForm.module.css';

import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { generateRandomString } from 'core/utils/generateRandomString';

import { Todo } from 'core/entities/todo';
import { addTodo } from 'store/todos/actions/addTodo';

import { Button } from 'components/common/Button';
import { TextField } from 'components/common/TextField';

export function TodoForm() {
  const [inputValue, setInputValue] = useState('');
  const [errorValue, setErrorValue] = useState('');

  const dispatch = useDispatch();

  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);

      if (errorValue && event.target.value.length > 3) {
        setErrorValue('');
      }
    },
    [errorValue]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const todo: Todo = {
      title: inputValue.trim(),
      id: generateRandomString(),
      pomodoros: 1,
      date: {
        created: Date.now()
      }
    };

    if (inputValue.length > 3) {
      dispatch(addTodo(todo));
      setInputValue('');
    } else {
      setErrorValue('Введите больше трех символов');
    }
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <TextField
        className={styles.field}
        placeholder='Название задачи'
        value={inputValue}
        onChange={handleInput}
        errorValue={errorValue}
      />
      <Button text='Добавить' />
    </form>
  );
}
