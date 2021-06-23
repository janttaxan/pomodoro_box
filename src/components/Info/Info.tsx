import styles from 'components/Info/Info.module.css';

import React from 'react';
import classNames from 'classnames';

interface InfoProps {
  className?: string;
}

export function Info({ className }: InfoProps) {
  return (
    <div className={classNames(styles.root, className)}>
      <h2 className={styles.title}>Ура! Теперь можно начать работать:</h2>
      <ul className={styles.list}>
        <li className={styles.item}>Выберите категорию и&nbsp;напишите название текущей задачи</li>
        <li className={styles.item}>Запустите таймер (&laquo;помидор&raquo;)</li>
        <li className={styles.item}>Работайте пока &laquo;помидор&raquo; не&nbsp;прозвонит</li>
        <li className={styles.item}>Сделайте короткий перерыв (3-5&nbsp;минут)</li>
        <li className={styles.item}>
          Продолжайте работать &laquo;помидор&raquo; за&nbsp;&laquo;помидором&raquo;, пока задача не&nbsp;будут
          выполнена. Каждые 4&nbsp;&laquo;помидора&raquo; делайте длинный перерыв (15-30&nbsp;минут).
        </li>
      </ul>
    </div>
  );
}
