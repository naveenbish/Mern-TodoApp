import AddSvg from "./demoassets/add.svg";
import { useEffect, useState } from "react";
export function CreateTodo(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const handleTitleChange = e =>{
    setTitle(e.target.value)
  }
  const handleDescChange = e =>{
    setDescription(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    props.onSubmit({
      id: Math.floor(Math.random()*10000),
      title: title,
      desc: description,
      done: 0
    })

    setTitle('')
    setDescription('')
  };

  return (
      <form onSubmit={handleSubmit} className="border p-5 rounded-2xl w-[450px]">
      <div className="font-bold text-white border-blue-400 border-b-2 w-fit">
        Add Todo
      </div>
      <div className="flex justify-between">
        <input
          id="title"
          placeholder="Add Title"
          className="border-blue-gray-200 text-white placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer w-full h-full border-b bg-transparent pb-1.5 pt-4 font-mono font-bold text-2xl outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="flex justify-between">
        <textarea
          id="description"
          placeholder="Add Description"
          className="border-blue-gray-200 text-white placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer w-full h-full border-b bg-transparent pb-1.5 pt-4 font-mono font-bold text-lg outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0"
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
