import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  visibleGoods: Todo;
};

export const TodoItem: React.FC<Props> = ({ visibleGoods }) => {
  return (
    <div data-cy="Todo" className="todo" key={visibleGoods.id}>
      <label className="todo__status-label" htmlFor={`todo-${visibleGoods.id}`}>
        {' '}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={visibleGoods.completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {visibleGoods.title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* 'is-active' class puts this modal on top of the todo */}
      <div data-cy="TodoLoader" className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
