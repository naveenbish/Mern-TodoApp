import AddSvg from "../assets/add.svg";
import { useState } from "react";
import { useGetTodos } from "../hooks/useTodos";
import { base_url } from "../config";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { getTodos } = useGetTodos();
  const token = localStorage.getItem("token");

  async function AddTodos() {
    await fetch(`${base_url}/todo/create`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    await getTodos();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded-md w-full bg-[#5c4a9c]">
      <div className="font-bold text-gray-500 text-2xl text-[#ffffff] w-fit border-b-2 mb-5">
        Add Todo
      </div>
      <div className="flex justify-between">
        <input
          id="title"
          placeholder="Add Title"
          className="border-blue-gray-200 text-white placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer w-full h-full border-b bg-transparent pb-1.5 pt-4 font-mono font-bold text-2xl outline outline-0 transition-all focus:outline-0 disabled:border-0"
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
          }}
        />
      </div>
      <div className="flex justify-between">
        <textarea
          id="description"
          placeholder="Add Description"
          className="border-blue-gray-200 text-white placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer w-full h-full border-b bg-transparent pb-1.5 pt-4 font-mono font-bold text-lg outline outline-0 transition-all focus:outline-0 disabled:border-0"
          onChange={(e) => {
            const value = e.target.value;
            setDescription(value);
          }}
        />
      </div>
      <div className="flex pt-3 justify-center align-middle">
        <button onClick={AddTodos}>
          <img src={AddSvg} alt="add svg" />
        </button>
      </div>
    </form>
  );
}
