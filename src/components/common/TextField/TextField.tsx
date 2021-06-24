import styles from './TextField.module.css';

import React, { ChangeEvent } from 'react';
import classNames from 'classnames';

interface TextFieldProps {
  placeholder: string;
  errorValue?: string;
  className?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({ placeholder, errorValue, className, value, onChange }: TextFieldProps) {
  const fieldClasses = classNames(styles.field, { [styles.error]: errorValue });

  return (
    <label className={classNames(styles.root, className)}>
      <input className={fieldClasses} value={value} onChange={onChange} type='text' placeholder={placeholder} />
      {errorValue && <span className={styles.errorValue}>{errorValue}</span>}
    </label>
  );
}
