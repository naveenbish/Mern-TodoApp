import AddSvg from "../assets/add.svg";
import { useEffect, useState } from "react";
export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function AddTodos() {
      fetch("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded-2xl">
      <div className="font-bold text-gray-500 border-blue-400 border-b-2 w-fit">
        Add Todo
      </div>
      <div className="flex justify-between">
        <input
          id="title"
          placeholder="Add Title"
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
          placeholder="Add Description"
          className="border-blue-gray-200 text-gray-500 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer w-full h-full border-b bg-transparent pb-1.5 pt-4 font-mono font-bold text-lg outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
          onChange={(e) => {
            const value = e.target.value;
            setDescription(value);
          }}
        />
      </div>
      <div className="flex pt-3 justify-center align-middle">
        <button onClick={AddTodos}>
          <img src={AddSvg} alt="" />
        </button>
      </div>
    </form>
  );
}
