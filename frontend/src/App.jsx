import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";
import { useEffect } from "react";
import { ColorBar } from "./components/ColorBar";
import { TodoHead } from "./components/TodoHead";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
    }, [todos])

  return (
    <div>
      {/* Upper Color Bar  */}
      <ColorBar />
      <div className="flex flex-col w-fit min-h-[95vh] m-auto justify-center py-20">
        <div className="border shadow-[0_0_10px_rgba(0,0,0,0.7)] p-10 rounded-[35px] max-w-[500px] m-10 min-h-[700px]">
          <TodoHead />
          <CreateTodo></CreateTodo>


          <div className="font-bold text-gray-500 pt-10 border-green-400 border-b-2 w-fit">
              Todos Listing
            </div>

          <Todos todos={todos}></Todos>
        </div>
      </div>

      {/* Lower Color Bar  */}
      <ColorBar />
    </div>
  );
}

export default App;
