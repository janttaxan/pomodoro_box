/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { MainThunkAction, MainThunkDispatch } from 'core/services/index';

import { setMinutes } from 'store/timer/actions/setMinutes';
import { setSeconds } from 'store/timer/actions/setSeconds';
import { setStatus } from 'store/timer/actions/setStatus';
import { initTimerTime } from 'store/timer/actions/initTimerTime';
import { setPomodoroCount } from 'store/timer/actions/setPomodoroCount';

export class TimerService {
  private timer: Optional<NodeJS.Timeout> = null;

  public start = (): MainThunkAction => (dispatch, getState) => {
    if (getState().timer.status === 'default' || getState().timer.status === 'pauseWork') {
      dispatch(setStatus('work'));

      this.timer = setInterval(
        () => this.decreaseTimerTime(getState().timer.todo.time.minute, getState().timer.todo.time.second, dispatch),
        100
      );
    } else if (getState().timer.status === 'pauseBreak') {
      dispatch(setStatus('break'));
      this.timer = setInterval(
        () => this.decreaseTimerTime(getState().timer.todo.time.minute, getState().timer.todo.time.second, dispatch),
        100
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

  private setNextTimer = (): MainThunkAction => (dispatch, getState) => {
    // если последний таймер был "помидор"
    if (getState().timer.status === 'work') {
      dispatch(setPomodoroCount(getState().timer.daylyCounters.pomodoro + 1));

      if (getState().timer.daylyCounters.pomodoro % 4 === 0) {
        // после каждого третьего помидора устанавливаем длинный перерыв
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
          100
        );
      } else {
        // Иначе включаем паузу
        dispatch(setStatus('pauseBreak'));
      }

      // если последний таймер был "перерыв"
    } else if (getState().timer.status === 'break') {
      dispatch(initTimerTime(getState().settings.pomodoroTime, 0));
      // если в настройках включен автостарт работы после перерыва
      if (getState().settings.autostartPomodoro) {
        // включаем помидор
        dispatch(setStatus('work'));
        this.timer = setInterval(
          () => this.decreaseTimerTime(getState().timer.todo.time.minute, getState().timer.todo.time.second, dispatch),
          100
        );
      } else {
        // иначе рабочая пауза
        dispatch(setStatus('pauseWork'));
      }
    }
  };
}
