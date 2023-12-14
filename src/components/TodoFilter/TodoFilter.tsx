import { FC, memo } from 'react';
import { CompletedFilter } from '../../types/types';

interface Props {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  completedFilter: CompletedFilter;
  setCompletedFilter: (completedFilter: CompletedFilter) => void;
}

const mapCompletedFilter = (completedFilter: string): CompletedFilter => {
  switch (completedFilter) {
    case CompletedFilter.Completed:
      return CompletedFilter.Completed;

    case CompletedFilter.Uncompleted:
      return CompletedFilter.Uncompleted;

    case CompletedFilter.All:
      return CompletedFilter.All;

    default:
      return CompletedFilter.All;
  }
};

export const TodoFilter: FC<Props> = memo((props) => {
  const {
    searchQuery,
    setSearchQuery,
    completedFilter,
    setCompletedFilter,
  } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={completedFilter}
            onChange={(event) => (
              setCompletedFilter(mapCompletedFilter(event.target.value))
            )}
          >
            <option value={CompletedFilter.All}>All</option>
            <option value={CompletedFilter.Uncompleted}>Active</option>
            <option value={CompletedFilter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
});
