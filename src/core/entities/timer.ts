export interface TimerTime {
  minute: number;
  second: number;
}

export interface TimerTodo {
  id: Optional<string>;
  time: TimerTime;
}

export enum TimerStatus {
  noTask = 'noTask',
  default = 'default',
  work = 'work',
  break = 'break',
  pauseWork = 'pauseWork',
  pauseBreak = 'pauseBreak'
}

export interface TimerCounters {
  pomodoro: number;
  break: number;
}

export interface TimerState {
  status: TimerStatus;
  daylyCounters: TimerCounters;
  todo: TimerTodo;
}
