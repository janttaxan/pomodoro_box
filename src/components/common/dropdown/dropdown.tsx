import styles from './dropdown.module.css';

import React, { RefObject, useCallback, useState, useEffect, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';

export function useDropdown(dropdownRef: RefObject<HTMLDivElement>, defaultOpened = false) {
  const [opened, toggleOpened] = useState(defaultOpened);

  const onOpen = useCallback(() => {
    toggleOpened(true);
  }, [opened]);

  const onClose = useCallback(() => {
    toggleOpened(false);
  }, [opened]);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        opened &&
        dropdownRef &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onClose();
      }
    },
    [opened]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return { opened, onOpen, onClose };
}

interface DropdownProps {
  className?: string;
  children: ReactNode;
  opened?: boolean;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const { className, children, opened } = props;

  const classes = classNames(styles.root, className, { [styles.opened]: opened });

  return (
    <div className={classes} ref={ref}>
      {children}
    </div>
  );
});
