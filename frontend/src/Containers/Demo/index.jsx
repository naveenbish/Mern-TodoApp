import { useState } from "react";
import { Todos } from "./DemoTodos";
import { TodoHead } from "./DemoTodoHead";
import SignupSide from "./SignupSide";

function Demo() {
  return (
    <div>
      {/* Upper Color Bar  */}
      <div className="flex flex-col">
        <div className="border">
          <SignupSide />
        </div>
        <div className="flex flex-col w-full m-auto items-center justify-center py-6 bg-[#37694A]">
          <div className="text-black text-5xl font-extrabold p-2 border-black border-2 my-2">Demo</div>
          <div className="border shadow-[0_0_10px_rgba(0,0,0,0.7)] p-5 rounded-[35px] bg-[#37694A]">
            <div className="text-4xl font-extrabold text-[#35373e] h-[45px]">ToDO List</div>
            <Todos />
          </div>
        </div>
      </div>
      {/* Lower Color Bar  */}
    </div>
  );
}

export default Demo;
