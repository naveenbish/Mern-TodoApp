import { CreateTodo } from '../../components/CreateTodo';
import { Todos } from '../../components/Todos';
import { ColorBar } from '../../components/ColorBar';
import { TodoHead } from '../../components/TodoHead';
import { RecoilRoot } from 'recoil';

function Home() {
  return (
    <RecoilRoot>
      <div className='bg-[#37694A] w-[100vw]'>
        {/* Upper Color Bar  */}
        <ColorBar />
        <div className='flex flex-col w-[900px] min-h-[95vh] justify-center m-auto'>
          <div className='border shadow-[0_0_10px_rgba(0,0,0,0.7)] p-10 rounded-[35px] m-10 min-h-[700px] bg-green-950'>
            <TodoHead />
            <CreateTodo />

            <div className='font-bold text-gray-500 pt-10 border-green-400 border-b-2 w-fit'>
              Todos Listing
            </div>

            <Todos />
          </div>
        </div>

        {/* Lower Color Bar  */}
        <ColorBar />
      </div>
    </RecoilRoot>
  );
}

export default Home;