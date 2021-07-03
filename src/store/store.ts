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
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 20,
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
