import { RootState } from 'core/entities/store';

export const initialState: RootState = {
  common: {
    pomodoroTime: 25
  },
  todos: {
    list: []
  }
};
