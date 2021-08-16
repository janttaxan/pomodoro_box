import styles from 'components/Layout/Content/Content.module.css';

import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface ContentProps {
  className?: string;
  children: ReactNode;
}

export function Content({ className, children }: ContentProps) {
  return <main className={classNames(styles.root, className)}>{children}</main>;
}
