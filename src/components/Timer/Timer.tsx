import styles from './Timer.module.css';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { RootState, SettingsState, TimerState, TodosState } from 'core/entities/store';
import { Todo } from 'core/entities/todo';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTodo } from 'store/timer/actions/updateCurrentTodo';

import { setStatus } from 'store/timer/actions/setStatus';
import { startTimerAsync } from 'store/timer/actions/startTimerAsync';
import { initTimerTime } from 'store/timer/actions/initTimerTime';

import { TimerHeader } from 'components/Timer/TimerHeader';
import { TimerTime } from 'components/Timer/TimerTime';
import { TimerControls } from 'components/Timer/TimerControls';

interface TimerProps {
  className?: string;
}

export function Timer({ className }: TimerProps) {
  const [todo, setTodo] = useState<Optional<Todo>>(null);

  const timer = useSelector<RootState, TimerState>((state) => state.timer);
  const todos = useSelector<RootState, TodosState>((state) => state.todos);
  const settings = useSelector<RootState, SettingsState>((state) => state.settings);

  const dispatch = useDispatch();

  // установка статусов и таймера при первом рендере (перезагрузке страницы)
  useEffect(() => {
    // если задачи есть и последний статус был "в работе"
    if (todos.list.length && timer.status === 'work') {
      // ставим на паузу работу и выставляем последнее значение таймера
      dispatch(setStatus('pauseWork'));
      dispatch(initTimerTime(timer.todo.time.minute, timer.todo.time.second));
    }

    // если задачи есть и последнией статус был "перерыв"
    if (todos.list.length && timer.status === 'break') {
      // ставим на паузу перерыв и выставляем последнее значение таймера
      dispatch(setStatus('pauseBreak'));
      dispatch(initTimerTime(timer.todo.time.minute, timer.todo.time.second));
    }

    // если задачи есть, и статус не был равен "work" и "break", то статус не меняется
    if (todos.list.length) {
      setTodo(todos.list[0]);
    }
  }, []);

  // следим за наличием задач
  useEffect(() => {
    // если добавлена первая задача
    if (todos.list.length && timer.status === 'noTask') {
      dispatch(setStatus('default'));
      dispatch(initTimerTime(settings.pomodoroTime, 0));
      dispatch(updateCurrentTodo(todos.list[0].id));
      setTodo(todos.list[0]);
    }

    // если удалены все задачи
    if (!todos.list.length) {
      dispatch(setStatus('noTask'));
      dispatch(updateCurrentTodo(null));
      dispatch(initTimerTime(0, 0));
      setTodo(null);
    }
  }, [todos, settings]);

  const handleAddMinute = () => {
    console.log('add minute');
  };

  const handleStart = () => {
    dispatch(startTimerAsync());
  };

  const handlePause = () => {
    console.log('Pause');
  };

  const handleStop = () => {
    console.log('Stop');
  };

  const handleDone = () => {
    console.log('Done');
  };

  const handleSkip = () => {
    console.log('Skip');
  };

  return (
    <section className={classNames(styles.root, className)}>
      <TimerHeader todoTitle={todo?.title} pomodoroCount={1} breakCount={1} status={timer.status} />
      <div className={styles.body}>
        <TimerTime
          minute={timer.todo.time.minute}
          second={timer.todo.time.second}
          status={timer.status}
          onAddMinute={handleAddMinute}
        />
        <div className={styles.info}>
          <span className={styles.infoProp}>Задача &mdash; </span>
          <span>{todo?.title}</span>
        </div>
        <TimerControls
          status={timer.status}
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
          onDone={handleDone}
          onSkip={handleSkip}
        />
      </div>
    </section>
  );
}
