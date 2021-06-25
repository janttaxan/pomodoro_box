import styles from './TodoList.module.css';

import React, { ChangeEvent } from 'react';
import { Todo } from 'core/entities/todo';

import { TodoItem } from 'components/Todos/TodoList/TodoItem';

interface TodoListProps {
  todos: Array<Todo>;
  onChangeTodoTitle: (id: string, event: ChangeEvent<HTMLInputElement>) => void;
  onSaveTodoTitle: (id: string) => void;
  onAddTodoPomodoro: (id: string) => void;
  onRemoveTodoPomodoro: (id: string) => void;
  onEditTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoList(props: TodoListProps) {
  const {
    todos,
    onChangeTodoTitle,
    onSaveTodoTitle,
    onAddTodoPomodoro,
    onRemoveTodoPomodoro,
    onEditTodo,
    onDeleteTodo
  } = props;

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <TodoItem
            className={styles.item}
            key={todo.id}
            id={todo.id}
            pomodoroCount={todo.pomodoroCount}
            title={todo.title}
            onChangeTitle={onChangeTodoTitle}
            onSaveTitle={onSaveTodoTitle}
            onAddPomodoro={onAddTodoPomodoro}
            onRemovePomodoro={onRemoveTodoPomodoro}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </ul>
      <span className={styles.totalTime}>25 мин</span>
    </div>
  );
}
