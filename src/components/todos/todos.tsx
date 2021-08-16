import styles from './todos.module.css';

import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { timeConvert } from 'core/utils/timeConvert';

import { CompletedTodosList } from 'components/todos/completed-todos-list/completed-todos-list';
import { Tab } from 'components/common/tabs/tab/tab';
import { Tabs } from 'components/common/tabs/tabs';
import { TodoForm } from 'components/todos/todo-form/todo-form';
import { TodoListContainer } from 'components/todos/todo-list-container/todo-list-container';

interface TodosProps {
  className?: string;
}

export function Todos({ className }: TodosProps) {
  const [totalMunutes, setTotalMunutes] = useState(0);
  const todos = [];
  // const todos = useSelector<RootState, TodosState>((state) => state.todos);
  // const settings = useSelector<RootState, SettingsState>((state) => state.settings);

  useEffect(() => {
    const minutes = todos.reduce(
      (totalTime, todo) => totalTime + todo.pomodoros * settings.pomodoroTime,
      0
    );

    setTotalMunutes(minutes);
  }, [todos]);

  return (
    <section className={classNames(styles.root, className)}>
      <TodoForm />

      <Tabs>
        <Tab label='Запланированно'>
          {todos.current.length > 0 ? (
            <>
              <TodoListContainer todos={todos.current} />
              {todos.current.length > 0 && <span className={styles.stickyInfo}>{timeConvert(totalMunutes)}</span>}
            </>
          ) : (
            <span className={styles.inlineInfo}>Список запланированных задач пуст...</span>
          )}
        </Tab>
        <Tab label='Сделано' disabled={!todos.completed.length}>
          <CompletedTodosList todos={todos.completed} />
        </Tab>
      </Tabs>

    </section>
  );
}
