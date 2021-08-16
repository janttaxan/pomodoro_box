import styles from './header.module.css';
import classNames from 'classnames';
import { preventHandleMouseDown } from 'core/utils/preventHandleMouseDown';

import IconEqualizer from 'components/common/icons/equalizer.svg';
import { Logo } from 'components/layout/header/logo/logo';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={classNames(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <a className={styles.link} href='/' onMouseDown={preventHandleMouseDown}>
            <IconEqualizer />
            <span className={styles.linkText}>Статистика</span>
          </a>
        </div>
      </div>
    </header>
  );
};
