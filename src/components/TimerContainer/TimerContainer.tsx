import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Todo } from 'core/entities/todo';
import { RootState, SettingsState, TimerState, TodosState } from 'core/entities/store';
import { TimerService } from 'core/services/TimerService';

import { setStatus } from 'store/timer/actions/setStatus';
import { initTimerTime } from 'store/timer/actions/initTimerTime';
import { updateCurrentTodo } from 'store/timer/actions/updateCurrentTodo';
import { setMinutes } from 'store/timer/actions/setMinutes';

import { Timer } from 'components/Timer';

const timerService = new TimerService();

export function TimerContainer(props: { className?: string }) {
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

    // если удалены (или выполнены) все задачи
    if (!todos.current.length) {
      dispatch(setStatus('noTask'));
      dispatch(initTimerTime(0, 0));
      setCurrentTodo(true);
      timerService.clearTimer();
    }

    // если задачи есть или поменялся порядок
    if (todos.current.length) {
      setCurrentTodo();
    }
  }, [todos, settings, timer.status]);

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
    <Timer
      className={props.className}
      currentTodo={todo}
      timer={timer}
      onAddMinute={handleAddMinute}
      onStart={handleStart}
      onPause={handlePause}
      onStop={handleStop}
      onDone={handleDone}
      onSkip={handleSkipBreak}
    />
  );
}
