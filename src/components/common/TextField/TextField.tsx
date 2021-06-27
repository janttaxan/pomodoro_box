import styles from './TextField.module.css';

import React, { ChangeEvent, forwardRef } from 'react';
import classNames from 'classnames';

type Size = 'sm' | 'lg';

interface TextFieldProps {
  // класс для обертки всего компонента
  className?: string;
  // дополнительный класс для инпута
  fieldClassName?: string;
  size?: Size;
  placeholder?: string;
  errorValue?: string;
  disabled?: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = forwardRef<Optional<HTMLInputElement>, TextFieldProps>((props, ref) => {
  const { className, fieldClassName, size = 'lg', placeholder, errorValue, disabled = false, value, onChange } = props;

  const fieldClasses = classNames(
    fieldClassName,
    styles.field,
    styles[size],
    { [styles.error]: errorValue },
    { [styles.disabled]: disabled }
  );

  return (
    <label className={classNames(styles.root, className)}>
      <input
        className={fieldClasses}
        value={value}
        onChange={onChange}
        type='text'
        placeholder={placeholder}
        disabled={disabled}
        ref={ref}
      />
      {errorValue && <span className={styles.errorValue}>{errorValue}</span>}
    </label>
  );
});
