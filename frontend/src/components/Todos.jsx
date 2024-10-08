import TickSvgRed from "../assets/tick_red.svg";
import TickSvgGreen from "../assets/tick_green.svg";
import DeleteSvg from "../assets/delete.svg";
import Edit from "./Edit";
import { useGetTodos } from "../hooks/useTodos";
import { base_url } from "../config";

export function Todos() {
  const { getTodos, todos } = useGetTodos();
  const token = localStorage.getItem("token");

  function isCompleted(value) {
    return (
      <img
        src={value ? TickSvgGreen : TickSvgRed}
        alt="tick.svg"
        className="cursor-pointer"
      />
    );
  }

  async function updateCompleted(index) {
    await fetch(`${base_url}/todo/complete`, {
      method: "PUT",
      body: JSON.stringify({ index: index }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    await getTodos();
  }

  async function deleteTodo(index) {
    await fetch(`${base_url}/todo/delete`, {
      method: "PUT",
      body: JSON.stringify({ index: index }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    await getTodos();
  }

  return (
    <div className="py-3">
      {todos.length === 0 ? (
        <div>Add some Todo here.</div>
      ) : (
        todos.map((todo, index) => {
          return (
            <div className="pb-6" key={index}>
              <Edit className="pt-0" todo={todo} />
              <div className="flex justify-between">
                <div className="w-[80%]">
                  {/* update Todo Button  */}
                  <div className="break-all flex text-xl font-bold text-[#5c4a9c]">
                    {todo.title}
                  </div>
                  {/* Description */}
                  <div className="font-bold break-words text-white">
                    {todo.description}
                  </div>
                </div>
                <div className="flex justify-center gap-3 w-[20%]">
                  {/* Complete and incomplete button */}
                  <div onClick={() => updateCompleted(index)}>
                    {isCompleted(todo.completed)}
                  </div>
                  {/* Delete Button : To delete the Particular Element form the Todos  */}
                  <div onClick={() => deleteTodo(index)}>
                    <img
                      src={DeleteSvg}
                      alt="delete.svg"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })
      )}
    </div>
  );
}
