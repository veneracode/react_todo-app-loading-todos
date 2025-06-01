import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo[];
  filter: string;
  setFilter: (filter: string) => void;
};

export const Footer: React.FC<Props> = ({ todo, filter, setFilter }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todo.filter(e => !e.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={`filter__link ${filter === 'all' ? 'selected' : ' '}`}
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ' '}`}
          onClick={() => setFilter('active')}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ' '}`}
          onClick={() => setFilter('completed')}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todo.filter(todos => todos.completed).length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
