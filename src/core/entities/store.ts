import { Todo } from 'core/entities/todo';

export interface RootState {
  timer: TimerState;
  settings: SettingsState;
  todos: TodosState;
  complitedTodos: TodosState;
}

export type TimerStatus = 'noTask' | 'default' | 'work' | 'break' | 'pauseWork' | 'pauseBreak';

export interface TimerTime {
  minute: number;
  second: number;
}

export interface TimerTodo {
  id: Optional<string>;
  time: TimerTime;
}

export interface TimerState {
  status: TimerStatus;
  todo: TimerTodo;
}

export interface SettingsState {
  // Время одного помидора (кол-во минут)
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  autostartPomodoro: boolean;
  autostartBreak: boolean;
}

export interface TodosState {
  list: Array<Todo>;
}
