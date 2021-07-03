export interface Todo {
  id: string;
  title: string;
  counters: TodoCounters;
  isDone: boolean;
  date: {
    // элементы даты храним в "timestump"
    created: number;
    complited?: number;
  };
}

export interface TodoCounters {
  pomodoro: {
    current: number;
    complited: number;
  };
}
