export interface Todo {
  id: string;
  title: string;
  pomodoros: number;
  date: {
    // элементы даты храним в "timestump"
    created: number;
    complited?: number;
  };
}
