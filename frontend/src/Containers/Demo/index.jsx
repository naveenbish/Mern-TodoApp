import { useState } from "react";
import { Todos } from "./DemoTodos";
import { ColorBar } from "./DemoColorBar";
import { TodoHead } from "./DemoTodoHead";
import SignupSide from "./SignupSide";

function Demo() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      {/* Upper Color Bar  */}
      <ColorBar />
      <div className="flex">
        <div className="w-[30%] h-[100vh] border">
          <SignupSide />
        </div>
        <div className="flex flex-col w-full min-h-[80vh] m-auto items-center justify-center py-20 bg-[#37694A]">
          <div className="text-black text-5xl font-extrabold p-2 border-black border-b-2 mb-5">Demo</div>
          <div className="border shadow-[0_0_10px_rgba(0,0,0,0.7)] p-5 rounded-[35px] max-w-[500px] mb-10 min-h-[700px] bg-[#37694A]">
            <TodoHead />
            {/* <CreateTodo></CreateTodo> */}
            <Todos />
          </div>
        </div>
      </div>
      {/* Lower Color Bar  */}
      <ColorBar />
    </div>
  );
}

export default Demo;
