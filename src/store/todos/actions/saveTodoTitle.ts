import { ActionCreator } from 'redux';

export const SAVE_TODO_TITLE = 'SAVE_TODO_TITLE';

export type SaveTodoTitle = {
  type: typeof SAVE_TODO_TITLE;
  payload: {
    id: string;
    newTitleValue: string;
  };
};

export const saveTodoTitle: ActionCreator<SaveTodoTitle> = (id: string, newTitleValue: string) => ({
  type: SAVE_TODO_TITLE,
  payload: {
    id,
    newTitleValue
  }
});
