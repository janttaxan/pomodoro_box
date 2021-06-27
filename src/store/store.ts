import { RootState } from 'core/entities/store';

export const initialState: RootState = {
  timer: {
    status: 'noTask',
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
    longBreakTime: 15,
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
