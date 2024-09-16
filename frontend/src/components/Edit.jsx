import Popup from "reactjs-popup";
import EditSvg from "../assets/edit.svg";
import { useState } from "react";
import { useGetTodos } from "../hooks/useTodos";
import { base_url } from "../config";

export default function Edit({ todo }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const { getTodos } = useGetTodos();
  const token = localStorage.getItem("token");

  async function UpdateTodos() {
    await fetch(`${base_url}/todo/update`, {
      method: "PUT",
      body: JSON.stringify({ id: todo._id, title, description }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    await getTodos();
  }
  return (
    <Popup
      trigger={
        <button>
          <img src={EditSvg} alt="edit.svg" className="cursor-pointer" />
        </button>
      }
      position="right center"
    >
      {(close) => (
        <div className="border p-3 rounded-md bg-[#5c4a9c]">
          <div className="flex justify-between">
            <input
              id="title"
              value={title}
              className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer w-full h-full border-b bg-transparent pb-1.5 pt-4 font-mono font-bold text-2xl outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
              }}
            />
          </div>
          <div className="flex justify-between">
            <input
              id="description"
              value={description}
              className="border-blue-gray-200 text-[#ffffff] placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer w-full h-full border-b bg-transparent pb-1.5 pt-4 font-mono font-bold text-lg outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
              onChange={(e) => {
                const value = e.target.value;
                setDescription(value);
              }}
            />
          </div>
          <div
            onClick={UpdateTodos}
            className="flex pt-3 justify-center align-middle"
          >
            <button onClick={close} className="font-extrabold text-xl text-[#5c4a9c] bg-[#1a1a1a] px-2 py-1 rounded-md">
              Save
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
