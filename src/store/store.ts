import { RootState } from 'core/entities/store';

export const initialState: RootState = {
  timer: {
    status: 'noTask',
    daylyCounters: {
      pomodoro: 0,
      break: 0
    },
    todo: {
      id: null,
      time: {
        minute: 0,
        second: 0
      }
    }
  },
  settings: {
    pomodoroTime: 1,
    shortBreakTime: 1,
    longBreakTime: 2,
    autostartPomodoro: false,
    autostartBreak: true
  },
  todos: {
    list: []
  },
  complitedTodos: {
    list: []
  }
};
