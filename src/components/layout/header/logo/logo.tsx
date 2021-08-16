import styles from './logo.module.css';
import { preventHandleMouseDown } from 'core/utils/preventHandleMouseDown';
import IconLogo from 'components/common/icons/logo.svg';

export const Logo = () => {
  return (
    <a className={styles.root} href='/' onMouseDown={preventHandleMouseDown}>
      <IconLogo />
      <span className={styles.text}>pomodoro_box</span>
    </a>
  );
};
