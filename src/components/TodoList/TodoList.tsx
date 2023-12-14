import React, { memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  selectTodo: (todoId: number) => void;
  selectedTodoId: number | null;
}

export const TodoList: React.FC<Props> = memo((props) => {
  const { todos, selectTodo, selectedTodoId } = props;

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th />
        </tr>
      </thead>

      <tbody>

        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            isSelected={selectedTodoId === todo.id}
            isCompleted={todo.completed}
            onSelectTodo={selectTodo}
          />
        ))}
      </tbody>
    </table>
  );
});
