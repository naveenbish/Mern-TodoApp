import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { todoAtom } from "../store/atoms";
import { base_url } from "../config";

export const useGetTodos = () => {
  const [todos, setTodos] = useRecoilState(todoAtom);

  const getTodos = useCallback(async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${base_url}/todo/todos`, {
      headers: {
        Authorization: `${token}`, // Include the JWT token in the Authorization header
      },
    });
    const json = await res.json();
    // setTodos(json.todos);
    if (json.todos.length) {
      setTodos(json.todos);
    } else {
      setTodos([]);
    }
  }, [setTodos]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return { getTodos, todos };
};
