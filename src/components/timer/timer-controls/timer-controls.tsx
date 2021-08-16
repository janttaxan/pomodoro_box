import styles from './timer-controls.module.css';

import { TimerStatus } from 'core/entities/timer';
import { Button } from 'components/common/button/button';

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
      case TimerStatus.noTask:
        return <Button text='Старт' disabled />;
      case TimerStatus.default:
        return <Button text='Старт' onClick={onStart} />;
      case TimerStatus.work:
        return <Button text='Пауза' onClick={onPause} />;
      case TimerStatus.pauseWork:
        return <Button text='Продолжить' onClick={onStart} />;
      case TimerStatus.break:
        return <Button text='Пауза' onClick={onPause} />;
      case TimerStatus.pauseBreak:
        return <Button text='Продолжить' onClick={onStart} />;
      default:
        return null;
    }
  };

  const renderSecondButton = () => {
    switch (status) {
      case TimerStatus.noTask:
        return <Button text='Стоп' variant='outlined' disabled />;
      case TimerStatus.default:
        return <Button text='Стоп' onClick={onStop} variant='outlined' disabled />;
      case TimerStatus.work:
        return <Button text='Стоп' onClick={onStop} variant='outlined' color='red' />;
      case TimerStatus.pauseWork:
        return <Button text='Сделано' onClick={onDone} variant='outlined' color='red' />;
      case TimerStatus.break:
        return <Button text='Пропустить' onClick={onSkip} variant='outlined' color='red' />;
      case TimerStatus.pauseBreak:
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
