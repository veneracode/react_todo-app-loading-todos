import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Header } from './components/header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/footer/Footer';

type SortType = 'all' | 'completed' | 'active';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<SortType | string>('all');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Приховуємо помилку через 3 секунди після того, як вона зʼявилася
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      // При розмонтуванні або якщо error зміниться раніше, очищаємо таймер
      return () => {
        clearTimeout(timer);
      };
    }
    // Якщо error === null, цей effect нічого не робить
  }, [error]);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        // Не кидаємо throw, тестуємо приховування
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  let visibleGoods = [...todos];

  if (filter === 'completed') {
    visibleGoods = visibleGoods.filter(good => good.completed);
  }

  if (filter === 'active') {
    visibleGoods = visibleGoods.filter(good => !good.completed);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header loading={isLoading} />
        <TodoList todos={visibleGoods} />

        {todos.length > 0 && (
          <Footer todo={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {error}
      </div>
    </div>
  );
};
