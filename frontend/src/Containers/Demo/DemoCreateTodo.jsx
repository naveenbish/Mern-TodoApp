import AddSvg from "./demoassets/add.svg";
import { useState } from "react";
export function CreateTodo(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }
  const handleDescChange = e => {
    setDescription(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      title: title,
      desc: description,
      done: 0
    })

    setTitle('')
    setDescription('')
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 border rounded-md bg-[#5c4a9c]">
      <div className="font-bold text-white border-[#ffffff] border-b-2 w-fit">
        Add Todo
      </div>
      <div className="flex justify-between">
        <input
          id="title"
          placeholder="Add Title"
          className="border-blue-gray-200 text-white placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer w-full h-full border-b bg-transparent pb-1.5 pt-4 font-mono font-bold text-2xl outline outline-0 transition-all focus:outline-0 disabled:border-0"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="flex justify-between">
        <textarea
          id="description"
          placeholder="Add Description"
          className="border-blue-gray-200 text-white placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer w-full h-full border-b bg-transparent pb-1.5 pt-4 font-mono font-bold text-lg outline outline-0 transition-all  focus:outline-0 disabled:border-0"
          value={description}
          onChange={handleDescChange}
        />
      </div>
      <div className="flex pt-3 justify-center align-middle">
        <button>
          <img src={AddSvg} alt="" />
        </button>
      </div>
    </form>
  );
}
