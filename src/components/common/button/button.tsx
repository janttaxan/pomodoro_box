import styles from './button.module.css';

import classNames from 'classnames';
import { preventHandleMouseDown } from 'core/utils/preventHandleMouseDown';

type Variant = 'contained' | 'outlined';
type Color = 'green' | 'red';

interface ButtonProps {
  className?: string;
  text: string;
  variant?: Variant;
  color?: Color;
  block?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  const { className, text, variant = 'contained', color = 'green', block = false, disabled = false, onClick } = props;

  const classes = classNames(
    styles.root,
    className,
    styles[variant],
    styles[color],
    { [styles.disabled]: disabled },
    { [styles.block]: block }
  );

  return (
    <button className={classes} onClick={onClick} onMouseDown={preventHandleMouseDown} disabled={disabled}>
      {text}
    </button>
  );
}
