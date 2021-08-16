import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useCallback } from 'react';

import { Todo } from 'core/entities/todo';

import { TodoList } from 'components/todos/todo-list/todo-list';

const reorder = (list: Array<Todo>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface TodoListContainerProps {
  todos: Array<Todo>;
}

export function TodoListContainer({ todos }: TodoListContainerProps) {

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedTodos = reorder(todos, result.source.index, result.destination.index);

    // reorderTodos(reorderedTodos)
  }

  const handleSaveTodoTitle = useCallback(
    (id: string, newTitleValue: string) => {
      // saveTodoTitle(id, newTitleValue)
    },
    [todos]
  );

  const handleAddTodoPomodoro = useCallback((id: string) => {
    // addTodoPomodoro(id);
  }, []);

  const handleRemoveTodoPomodoro = useCallback((id: string) => {
    // removeTodoPomodoro(id);
  }, []);

  const handleDeleteTodo = useCallback((id: string) => {
    // deleteTodo(id);
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
