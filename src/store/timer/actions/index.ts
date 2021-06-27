import { UpdateCurrentTodo } from 'store/timer/actions/updateCurrentTodo';
import { SetStatus } from 'store/timer/actions/setStatus';
import { InitTimerTime } from 'store/timer/actions/initTimerTime';
import { SetSeconds } from 'store/timer/actions/setSeconds';
import { SetMinutes } from 'store/timer/actions/setMinutes';

export type TimerActions = UpdateCurrentTodo | SetStatus | InitTimerTime | SetSeconds | SetMinutes;
