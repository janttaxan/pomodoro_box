import styles from './TodoForm.module.css';

import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Button } from 'components/common/Button';
import { TextField } from 'components/common/TextField';

export function TodoForm() {
  const [inputValue, setInputValue] = useState('');

  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(inputValue);
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <TextField className={styles.field} placeholder='Название задачи' value={inputValue} onChange={handleInput} />
      <Button text='Добавить' />
    </form>
  );
}
