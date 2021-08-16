import styles from './completed-todos-list.module.css';

import { Todo } from 'core/entities/todo';
import { TodoItem } from 'components/todos/todo-item/todo-item';

interface CompletedTodosListProps {
  todos: Array<Todo>;
}

export function CompletedTodosList({ todos }: CompletedTodosListProps) {
  return (
    <ul className={styles.root}>
      {todos.map((todo) => (
        <TodoItem
          className={styles.item}
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isDone
          onDeleteTodo={console.log}
        />
      ))}
    </ul>
  );
}
