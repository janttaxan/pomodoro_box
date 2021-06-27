export interface Todo {
  id: string;
  title: string;
  pomodoro: TodoCounters;
  break: TodoCounters;
  isDone: boolean;
  date: {
    // элменетны даты храним в "timestump"
    created: number;
    complited?: number;
  };
}

export interface TodoCounters {
  currentCount: Optional<number>;
  complitedCount: number;
}
