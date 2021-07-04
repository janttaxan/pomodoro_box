// TODO: почистить исключения
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable consistent-return */

import { MainThunkAction, MainThunkDispatch } from 'core/services/index';

import { setMinutes } from 'store/timer/actions/setMinutes';
import { setSeconds } from 'store/timer/actions/setSeconds';
import { setStatus } from 'store/timer/actions/setStatus';
import { initTimerTime } from 'store/timer/actions/initTimerTime';
import { setPomodoroCount } from 'store/timer/actions/setPomodoroCount';
import { setBreakCount } from 'store/timer/actions/setBreakCount';
import { moveTodoToCompleted } from 'store/todos/actions/moveTodoToCompleted';
import { removeTodoPomodoro } from 'store/todos/actions/removeTodoPomodoro';
import { addTodoCompletedPomodoro } from 'store/todos/actions/addTodoCompletedPomodoro';

export class TimerService {
  private intervalTime = 10;
  private timer: Optional<NodeJS.Timeout> = null;

  public start = (): MainThunkAction => (dispatch, getState) => {
    if (getState().timer.status === 'default' || getState().timer.status === 'pauseWork') {
      dispatch(setStatus('work'));

      this.timer = setInterval(
        () => this.decreaseTimerTime(getState().timer.todo.time.minute, getState().timer.todo.time.second, dispatch),
        this.intervalTime
      );
    } else if (getState().timer.status === 'pauseBreak') {
      dispatch(setStatus('break'));
      this.timer = setInterval(
        () => this.decreaseTimerTime(getState().timer.todo.time.minute, getState().timer.todo.time.second, dispatch),
        this.intervalTime
      );
    }
  };

  public pause = (): MainThunkAction => (dispatch, getState) => {
    if (this.timer) {
      clearInterval(this.timer);
    }

    if (getState().timer.status === 'work') {
      dispatch(setStatus('pauseWork'));
    }

    if (getState().timer.status === 'break') {
      dispatch(setStatus('pauseBreak'));
    }
  };

  public skipBreak = (): MainThunkAction => (dispatch, getState) => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    // добавили +1 к счетчику перерывов и инициализируем помидор
    dispatch(setBreakCount(getState().timer.daylyCounters.break + 1));
    dispatch(this.initWork());
  };

  public skipWork = (): MainThunkAction => (dispatch, getState) => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    // добавили +1 к счетчику помидоров и инициализируем перерыв
    dispatch(setPomodoroCount(getState().timer.daylyCounters.pomodoro + 1));
    dispatch(this.initBreak());
  };

  public stop = (): MainThunkAction => (dispatch, getState) => {
    if (this.timer) {
      clearInterval(this.timer);
    }

    dispatch(setStatus('default'));
    dispatch(initTimerTime(getState().settings.pomodoroTime, 0));
  };

  private decreaseTimerTime = (currentMinute: number, currentSecond: number, dispatch: MainThunkDispatch) => {
    if (currentMinute === 0 && currentSecond === 0 && this.timer) {
      clearInterval(this.timer);
      dispatch(this.setNextTimer());
    }

    if (currentMinute > 0 && currentSecond === 0) {
      dispatch(setMinutes(currentMinute - 1));
      dispatch(setSeconds(59));
    }

    if (currentSecond > 0) {
      dispatch(setSeconds(currentSecond - 1));
    }
  };

  private initWork = (): MainThunkAction => (dispatch, getState) => {
    // устанавливаем время помидора
    dispatch(initTimerTime(getState().settings.pomodoroTime, 0));
    // если в настройках включен автостарт работы после перерыва
    if (getState().settings.autostartPomodoro) {
      // включаем помидор
      dispatch(setStatus('work'));
      this.timer = setInterval(
        () => this.decreaseTimerTime(getState().timer.todo.time.minute, getState().timer.todo.time.second, dispatch),
        this.intervalTime
      );
    } else {
      // иначе рабочая пауза
      dispatch(setStatus('pauseWork'));
    }
  };

  private initBreak = (): MainThunkAction => (dispatch, getState) => {
    // если счетчик выполненного помидора кратен 4
    if (getState().timer.daylyCounters.pomodoro % 4 === 0) {
      // устанавливаем длинный перерыв
      dispatch(initTimerTime(getState().settings.longBreakTime, 0));
    } else {
      // иначе устанавливаем короткий перерыв
      dispatch(initTimerTime(getState().settings.shortBreakTime, 0));
    }

    // если в настройках включен автостарт перерыва после работы
    if (getState().settings.autostartBreak) {
      // включаем перерыв
      dispatch(setStatus('break'));
      this.timer = setInterval(
        () => this.decreaseTimerTime(getState().timer.todo.time.minute, getState().timer.todo.time.second, dispatch),
        this.intervalTime
      );
    } else {
      // Иначе включаем паузу
      dispatch(setStatus('pauseBreak'));
    }
  };

  // private completeTodoPomodoro = (): MainThunkAction => (dispatch, getState) => {
  //   const currentTodo = getState().todos.current.find((todo) => todo.id === getState().timer.todo.id);
  //
  //   if (!currentTodo) {
  //     return null;
  //   }
  //
  //   dispatch(removeTodoPomodoro(currentTodo.id));
  //   dispatch(addTodoCompletedPomodoro(currentTodo.id));
  //
  //   if (currentTodo.counters.pomodoro.current <= 1) {
  //     dispatch(moveTodoToCompleted(currentTodo));
  //   }
  // };

  private setNextTimer = (): MainThunkAction => (dispatch, getState) => {
    // если последний таймер был "помидор"
    if (getState().timer.status === 'work') {
      // добавили +1 к счетчику помидоров и инициализируем перерыв
      dispatch(setPomodoroCount(getState().timer.daylyCounters.pomodoro + 1));
      dispatch(this.initBreak());
    }

    // если последний таймер был "перерыв"
    if (getState().timer.status === 'break') {
      // добавили +1 к счетчику перерывов и инициализируем помидор
      dispatch(setBreakCount(getState().timer.daylyCounters.break + 1));
      dispatch(this.initWork());
    }
  };
}
