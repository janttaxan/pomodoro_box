import { RootState } from 'core/entities/store';

export const initialState: RootState = {
  todos: {
    // TODO: очистить массив
    list: [
      {
        id: '1',
        title: 'Сверстать сайт',
        pomodoroCount: 1,
        isDone: false
      },
      {
        id: '2',
        title: 'Проверить валидность',
        pomodoroCount: 5,
        isDone: false
      }
    ]
  }
};
