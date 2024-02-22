import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { todoAtom } from '../store/atoms';

export const useGetTodos = () => {
  const [todos, setTodos] = useRecoilState(todoAtom);

  const getTodos = useCallback(async () => {
    const res = await fetch('http://65.0.92.246:3000/todos');
    const json = await res.json();
    setTodos(json.todos);
  }, [setTodos]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return { getTodos, todos };
};
