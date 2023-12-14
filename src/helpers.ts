import { CompletedFilter } from './types/types';
import { Todo } from './types/Todo';

const getIsMatchCompletedFilter = (
  isCompleted: boolean,
  completedFilter: CompletedFilter,
) => {
  if (completedFilter === CompletedFilter.All) {
    return true;
  }

  if (completedFilter === CompletedFilter.Completed) {
    return isCompleted;
  }

  if (completedFilter === CompletedFilter.Uncompleted) {
    return !isCompleted;
  }

  return true;
};

const getIsMatchSearchQuery = (title: string, searchQuery: string) => {
  return title.toLowerCase().includes(searchQuery.toLowerCase());
};

export const filterTodo = (
  todos: Todo[],
  searchQuery: string,
  completedFilter: CompletedFilter,
): Todo[] => {
  return todos.filter((todo) => {
    const isMatchCompleted = getIsMatchCompletedFilter(
      todo.completed,
      completedFilter,
    );

    const isMatchSearch = getIsMatchSearchQuery(todo.title, searchQuery);

    return isMatchCompleted && isMatchSearch;
  });
};
