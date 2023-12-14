import React, { FC } from 'react';
import cn from 'classnames';

interface Props {
  id: number;
  title: string;
  isCompleted: boolean;
  isSelected: boolean;
  onSelectTodo: (todoId: number) => void;
}

export const TodoItem: FC<Props> = React.memo((props) => {
  const {
    id,
    title,
    isCompleted,
    isSelected,
    onSelectTodo,
  } = props;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isSelected,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {isCompleted && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        {/* <p className="has-text-danger has-text-success"> */}
        <p className={cn({
          'has-text-danger': !isCompleted,
          'has-text-success': isCompleted,
        })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onSelectTodo(id)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !isSelected,
                'fa-eye-slash': isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
