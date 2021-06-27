export interface Todo {
  id: string;
  title: string;
  pomodoros?: Array<Pomodoro>;
  pomodoroCount: number;
  isDone: boolean;
  date: {
    // элменетны даты храним в "timestump"
    created: number;
  }
}

export interface Pomodoro {

}
