import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import './App.scss';
import { TodoModal } from './components/TodoModal';
import { CompletedFilter } from './types/types';
import { filterTodo } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [completedFilter, setCompletedFilter] = useState<CompletedFilter>(
    CompletedFilter.All,
  );

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then((todosFS) => setTodos(todosFS))
      .finally(() => setIsTodosLoading(false));
  }, []);

  const selectedTodo = todos.find(t => t.id === selectedTodoId);

  const filteredTodos = useMemo(
    () => filterTodo(todos, searchQuery, completedFilter),
    [completedFilter, searchQuery, todos],
  );

  const closeModal = useCallback(() => setSelectedTodoId(null), []);
  const selectTodo = useCallback((id: number) => setSelectedTodoId(id), []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                completedFilter={completedFilter}
                setCompletedFilter={setCompletedFilter}
              />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}

              {!isTodosLoading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  selectTodo={selectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onRequestCloseModal={closeModal}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
