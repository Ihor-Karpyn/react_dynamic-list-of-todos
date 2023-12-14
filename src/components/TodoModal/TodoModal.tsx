import React, { memo, useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUserById } from '../../api';

interface Props {
  onRequestCloseModal: () => void;
  todo: Todo;
}

export const TodoModal: React.FC<Props> = memo((props) => {
  const {
    onRequestCloseModal,
    todo,
  } = props;

  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(
    () => {
      setIsUserLoading(true);
      setUser(null);

      getUserById(todo.userId)
        .then((userFS) => setUser(userFS))
        .finally(() => setIsUserLoading(false));
    },
    [todo.userId],
  );

  return (
    <div className="modal is-active" data-cy="modal">
      <label htmlFor="modal-background">
        <div className="modal-background" />
        <button
          type="button"
          onClick={onRequestCloseModal}
          id="modal-background"
          style={{ display: 'none' }}
        />
      </label>

      {isUserLoading && <Loader /> }

      {!isUserLoading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onRequestCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            {user && (
              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className={cn({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
