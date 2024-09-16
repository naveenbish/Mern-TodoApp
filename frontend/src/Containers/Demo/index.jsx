import { Todos } from "./DemoTodos";
import SignupSide from "./SignupSide";

function Demo() {
  return (
    <div>
      {/* Upper Color Bar  */}
      <div className="flex flex-col text-[#5c4a9c] bg-[#212121]">
        <div className="bg-[#1a1a1a]">
          <SignupSide />
        </div>
        <div className="flex flex-col w-full m-auto items-center justify-center py-6">
          <div className="text-5xl font-extrabold p-2 border-[#5c4a9c] border-b-2">Demo</div>
          <div className="p-5 m-5 bg-[#1a1a1a]">
            <div className="text-4xl font-extrabold text-[#5c4a9c] h-[45px] border-[#5c4a9c] border-b-2 w-fit">ToDO List</div>
            <Todos />
          </div>
        </div>
      </div>
      {/* Lower Color Bar  */}
    </div>
  );
}

export default Demo;
