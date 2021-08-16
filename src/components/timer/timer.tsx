import styles from 'components/timer/timer.module.css';

import classNames from 'classnames';

import { TimerState } from 'core/entities/timer';
import { Todo } from 'core/entities/todo';

import { TimerControls } from 'components/timer/timer-controls/timer-controls';
import { TimerHeader } from 'components/timer/timer-header/timer-header';
import { TimerInfo } from 'components/timer/timer-info/timer-info';
import { TimerTime } from 'components/timer/timer-time/timer-time';

interface TimerProps {
  className?: string;
  currentTodo: Optional<Todo>;
  timer: TimerState;
  onAddMinute: () => void;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onDone: () => void;
  onSkip: () => void;
}

export function Timer(props: TimerProps) {
  const { className, currentTodo, timer, onAddMinute, onStart, onPause, onStop, onDone, onSkip } = props;

  return (
    <section className={classNames(styles.root, className)}>
      <TimerHeader
        todoTitle={currentTodo?.title}
        pomodoroCount={timer.daylyCounters.pomodoro + 1}
        breakCount={timer.daylyCounters.break + 1}
        status={timer.status}
      />
      <div className={styles.body}>
        <TimerTime
          minute={timer.todo.time.minute}
          second={timer.todo.time.second}
          status={timer.status}
          onAddMinute={onAddMinute}
        />
        <TimerInfo todoTitle={currentTodo?.title} hasTodo={!!currentTodo} />
        <TimerControls
          status={timer.status}
          onStart={onStart}
          onPause={onPause}
          onStop={onStop}
          onDone={onDone}
          onSkip={onSkip}
        />
      </div>
    </section>
  );
}
