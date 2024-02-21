import TickSvgRed from "./demoassets/tick_red.svg";
import TickSvgGreen from "./demoassets/tick_green.svg";
import DeleteSvg from "./demoassets/delete.svg";
import { useState } from "react";
import { CreateTodo } from "./DemoCreateTodo";
import Popup from "reactjs-popup";
import EditSvg from "./demoassets/edit.svg";

export function Todos() {
  const [title, setTitle] = useState('Title');
  const [description, setDescription] = useState('Description');
  const [num, setNum] = useState(1);
  const [todos, setTodos] = useState([
    {
      id: 0,
      title: "Go To Gym",
      desc: "Elevate your well-being with invigorating workouts and top-notch equipment. Got to the gym and unlock a fitter, healthier you! 🏋️‍♀️💪",
      done: 0,
    },
  ]);

  const addTodo = (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }
    if (!todo.desc || /^\s*$/.test(todo.desc)) {
      return;
    }
    setNum(num + 1);
    todo.id = num;
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  function updateDone(todo) {
    if (todo.done == 0) {
      todo.done = 1;
    } else {
      todo.done = 0;
    }
    const updatedTodo = todos.slice(0);
    setTodos(updatedTodo)
  }

  function isCompleted(todo) {
    if (todo.done == 1) {
      return (
        <img src={TickSvgGreen} alt="tick.svg" className="cursor-pointer" />
      );
    } else {
      return <img src={TickSvgRed} alt="tick.svg" className="cursor-pointer" />;
    }
  }

  function deleteTodo(id) {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  }

  const updateTodo = (id) => {
    if (!title || /^\s*$/.test(title)) {
      return;
    }
    if (!description || /^\s*$/.test(description)) {
      return;
    }
    todos.map((todo) => {
      if (todo.id == id) {
        todo.title = title;
        todo.desc = description;
      }
    });
    setTodos([...todos]);
  };

  return (
    <div className="py-3 w-fit">
      <CreateTodo onSubmit={addTodo} />
      <div className="font-bold text-white pt-10 border-green-400 border-b-2 w-fit mb-8">
        Todos Listing
      </div>
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="pb-6">
            <div className="flex justify-between">
              <div className="w-[80%]">
                {/* Edit section  */}
                <div>
                  <Popup
                    trigger={
                      <button>
                        <img
                          src={EditSvg}
                          alt="edit.svg"
                          className="cursor-pointer"
                        />
                      </button>
                    }
                    position="right center"
                  >
                    {(close) => (
                      <div className="border p-3 rounded-2xl bg-gray-400">
                        <div className="flex justify-between">
                          <input
                            id="title"
                            value={title}
                            className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer w-full h-full border-b bg-transparent pb-1.5 pt-4 font-mono font-bold text-2xl outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
                            onChange={(e) => {
                              const titleValue = e.target.value;
                              setTitle(titleValue);
                            }}
                          />
                        </div>
                        <div className="flex justify-between">
                          <input
                            id="description"
                            value={description}
                            className="border-blue-gray-200 text-gray-500 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer w-full h-full border-b bg-transparent pb-1.5 pt-4 font-mono font-bold text-lg outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
                            onChange={(e) => {
                              const descValue = e.target.value;
                              setDescription(descValue);
                            }}
                          />
                        </div>
                        <div
                          onClick={() => {
                            updateTodo(todo.id);
                          }}
                          className="flex pt-3 justify-center align-middle"
                        >
                          <button
                            onClick={close}
                            className="font-extrabold text-xl"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>

                {/* update Todo Button  */}
                <div className="flex text-xl font-bold text-black">
                  {/* <Edit todo={todo} todos={todos} /> */}
                  {todo.title}
                </div>
                {/* Description */}
                <div className="font-bold text-white">{todo.desc}</div>
              </div>
              <div className="flex justify-center gap-3 w-[20%]">
                {/* Complete and incomplete button */}
                <div onClick={() => updateDone(todo)}>{isCompleted(todo)}</div>
                {/* Delete Button : To delete the Particular Element form the Todos  */}
                <div onClick={() => deleteTodo(todo.id)}>
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
      })}
    </div>
  );
}
