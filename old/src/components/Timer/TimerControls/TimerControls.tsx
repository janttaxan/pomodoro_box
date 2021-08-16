import styles from 'components/Timer/TimerControls/TimerControls.module.css';

import React from 'react';
import { TimerStatus } from 'core/entities/store';
import { Button } from 'components/common/Button';

interface TimerControlsProps {
  status: TimerStatus;

  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onDone: () => void;
  onSkip: () => void;
}

export function TimerControls({ status, onStart, onPause, onStop, onDone, onSkip }: TimerControlsProps) {
  const renderFirstButton = () => {
    switch (status) {
      case 'noTask':
        return <Button text='Старт' disabled />;
      case 'default':
        return <Button text='Старт' onClick={onStart} />;
      case 'work':
        return <Button text='Пауза' onClick={onPause} />;
      case 'pauseWork':
        return <Button text='Продолжить' onClick={onStart} />;
      case 'break':
        return <Button text='Пауза' onClick={onPause} />;
      case 'pauseBreak':
        return <Button text='Продолжить' onClick={onStart} />;
      default:
        return null;
    }
  };

  const renderSecondButton = () => {
    switch (status) {
      case 'noTask':
        return <Button text='Стоп' variant='outlined' disabled />;
      case 'default':
        return <Button text='Стоп' onClick={onStop} variant='outlined' disabled />;
      case 'work':
        return <Button text='Стоп' onClick={onStop} variant='outlined' color='red' />;
      case 'pauseWork':
        return <Button text='Сделано' onClick={onDone} variant='outlined' color='red' />;
      case 'break':
        return <Button text='Пропустить' onClick={onSkip} variant='outlined' color='red' />;
      case 'pauseBreak':
        return <Button text='Пропустить' onClick={onSkip} variant='outlined' color='red' />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.root}>
      {renderFirstButton()}
      {renderSecondButton()}
    </div>
  );
}
