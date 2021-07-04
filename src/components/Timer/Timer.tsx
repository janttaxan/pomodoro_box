// TODO: почистить исключения
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */

import styles from './Timer.module.css';

import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import { RootState, SettingsState, TimerState, TodosState } from 'core/entities/store';
import { Todo } from 'core/entities/todo';
import { useDispatch, useSelector } from 'react-redux';
import { TimerService } from 'core/services/TimerService';

import { updateCurrentTodo } from 'store/timer/actions/updateCurrentTodo';

import { setStatus } from 'store/timer/actions/setStatus';
import { initTimerTime } from 'store/timer/actions/initTimerTime';

import { TimerHeader } from 'components/Timer/TimerHeader';
import { TimerTime } from 'components/Timer/TimerTime';
import { TimerControls } from 'components/Timer/TimerControls';
import { setMinutes } from 'store/timer/actions/setMinutes';
import { TimerInfo } from 'components/Timer/TimerInfo';

interface TimerProps {
  className?: string;
}

const timerService = new TimerService();

export function Timer({ className }: TimerProps) {
  const [todo, setTodo] = useState<Optional<Todo>>(null);

  const timer = useSelector<RootState, TimerState>((state) => state.timer);
  const todos = useSelector<RootState, TodosState>((state) => state.todos);
  const settings = useSelector<RootState, SettingsState>((state) => state.settings);

  const dispatch = useDispatch();

  // установка статусов и таймера при первом рендере (перезагрузке страницы)
  useEffect(() => {
    // если задачи есть и последний статус был "в работе"
    if (todos.current.length && timer.status === 'work') {
      // ставим на паузу работу и выставляем последнее значение таймера
      dispatch(setStatus('pauseWork'));
      dispatch(initTimerTime(timer.todo.time.minute, timer.todo.time.second));
    }

    // если задачи есть и последнией статус был "перерыв"
    if (todos.current.length && timer.status === 'break') {
      // ставим на паузу перерыв и выставляем последнее значение таймера
      dispatch(setStatus('pauseBreak'));
      dispatch(initTimerTime(timer.todo.time.minute, timer.todo.time.second));
    }

    // если задачи есть, и статус не был равен "work" и "break", то статус не меняется
    if (todos.current.length) {
      setTodo(todos.current[0]);
    }
  }, []);

  // следим за наличием задач
  useEffect(() => {
    const setCurrentTodo = (reset = false) => {
      if (reset) {
        dispatch(updateCurrentTodo(null));
        setTodo(null);
      } else {
        dispatch(updateCurrentTodo(todos.current[0].id));
        setTodo(todos.current[0]);
      }
    };

    // если добавлена первая задача
    if (todos.current.length && timer.status === 'noTask') {
      dispatch(setStatus('default'));
      dispatch(initTimerTime(settings.pomodoroTime, 0));
      setCurrentTodo();
    }

    // если удалены все задачи
    if (!todos.current.length) {
      dispatch(setStatus('noTask'));
      dispatch(initTimerTime(0, 0));
      setCurrentTodo(true);
    }

    // если задачи есть и поменялся порядок
    if (todos.current.length) {
      setCurrentTodo();
    }
  }, [todos, settings]);

  const handleAddMinute = useCallback(() => {
    dispatch(setMinutes(timer.todo.time.minute + 1));
  }, [timer.todo.time.minute]);

  const handleStart = useCallback(() => {
    dispatch(timerService.start());
  }, []);

  const handlePause = useCallback(() => {
    dispatch(timerService.pause());
  }, []);

  const handleStop = useCallback(() => {
    dispatch(timerService.stop());
  }, []);

  const handleDone = useCallback(() => {
    dispatch(timerService.skipWork());
  }, []);

  const handleSkipBreak = useCallback(() => {
    dispatch(timerService.skipBreak());
  }, []);

  return (
    <section className={classNames(styles.root, className)}>
      <TimerHeader
        todoTitle={todo?.title}
        pomodoroCount={timer.daylyCounters.pomodoro + 1}
        breakCount={timer.daylyCounters.break + 1}
        status={timer.status}
      />
      <div className={styles.body}>
        <TimerTime
          minute={timer.todo.time.minute}
          second={timer.todo.time.second}
          status={timer.status}
          onAddMinute={handleAddMinute}
        />
        <TimerInfo todoTitle={todo?.title} hasTodo={!!todo} />
        <TimerControls
          status={timer.status}
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
          onDone={handleDone}
          onSkip={handleSkipBreak}
        />
      </div>
    </section>
  );
}
