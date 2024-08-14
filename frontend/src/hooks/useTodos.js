import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { todoAtom } from "../store/atoms";
import { base_url } from "../config";

export const useGetTodos = () => {
  const [todos, setTodos] = useRecoilState(todoAtom);

  const getTodos = useCallback(async () => {
    const res = await fetch(`${base_url}/todo/todos`);
    const json = await res.json();
    setTodos(json.todos);
  }, [setTodos]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return { getTodos, todos };
};
