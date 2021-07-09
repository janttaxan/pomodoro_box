// TODO: почистить исключения
/* eslint-disable @typescript-eslint/unbound-method*/
import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { TodoList } from 'components/Todos/TodoList';
import { Todo } from 'core/entities/todo';
import { deleteTodo } from 'store/todos/actions/deleteTodo';
import { addTodoPomodoro } from 'store/todos/actions/addTodoPomodoro';
import { removeTodoPomodoro } from 'store/todos/actions/removeTodoPomodoro';
import { saveTodoTitle } from 'store/todos/actions/saveTodoTitle';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { reorderTodos } from 'store/todos/actions/reorderTodos';

const reorder = (list: Array<Todo>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface TodoListContainerProps {
  todos: Array<Todo>
}

export function TodoListContainer({ todos }: TodoListContainerProps) {
  const dispatch = useDispatch();

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedTodos = reorder(todos, result.source.index, result.destination.index);

    dispatch(reorderTodos(reorderedTodos));
  }

  const handleSaveTodoTitle = useCallback(
    (id: string, newTitleValue: string) => {
      dispatch(saveTodoTitle(id, newTitleValue));
    },
    [todos]
  );

  const handleAddTodoPomodoro = useCallback((id: string) => {
    dispatch(addTodoPomodoro(id));
  }, []);

  const handleRemoveTodoPomodoro = useCallback((id: string) => {
    dispatch(removeTodoPomodoro(id));
  }, []);

  const handleDeleteTodo = useCallback((id: string) => {
    dispatch(deleteTodo(id));
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='todoList'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <TodoList
              todos={todos}
              onSaveTodoTitle={handleSaveTodoTitle}
              onAddTodoPomodoro={handleAddTodoPomodoro}
              onRemoveTodoPomodoro={handleRemoveTodoPomodoro}
              onDeleteTodo={handleDeleteTodo}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
