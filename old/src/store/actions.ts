import { TodosActions } from 'store/todos/actions';
import { TimerActions } from 'store/timer/actions';

export type Actions = TodosActions | TimerActions;
