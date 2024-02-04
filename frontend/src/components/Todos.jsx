import TickSvgRed from '../assets/tick_red.svg';
import TickSvgGreen from '../assets/tick_green.svg';
import DeleteSvg from '../assets/delete.svg';
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import Edit from './Edit';
import { useGetTodos } from '../hooks/useTodos';

export function Todos() {
  const { getTodos, todos } = useGetTodos();

  function isCompleted(value) {
    return (
      <img
        src={value ? TickSvgGreen : TickSvgRed}
        alt='tick.svg'
        className='cursor-pointer'
      />
    );
  }

  async function updateCompleted(todos) {
    await fetch('http://localhost:3000/completed', {
      method: 'PUT',
      body: JSON.stringify({ id: todos._id }),
      headers: { 'Content-Type': 'application/json' },
    });
    await getTodos();
  }

  async function deleteTodo(todos) {
    await fetch('http://localhost:3000/delete', {
      method: 'PUT',
      body: JSON.stringify({ id: todos._id }),
      headers: { 'Content-Type': 'application/json' },
    });
    await getTodos();
  }

  return (
    <div className='py-3'>
      {todos.map((todo, index) => {
        return (
          <div className='pb-6' key={index}>
            <div className='flex justify-between'>
              <div>
                {/* update Todo Button  */}
                <div className='flex text-xl font-bold text-[#35373e]'>
                  <Edit todo={todo} />
                  {todo.title}
                </div>
                {/* Description */}
                <div className='font-bold text-gray-500 ml-7'>
                  {todo.description}
                </div>
              </div>
              <div className='flex justify-center gap-3'>
                {/* Complete and incomplete button */}
                <div onClick={() => updateCompleted(todo)}>
                  {isCompleted(todo.completed)}
                </div>
                {/* Delete Button : To delete the Particular Element form the Todos  */}
                <div onClick={() => deleteTodo(todo)}>
                  <img
                    src={DeleteSvg}
                    alt='delete.svg'
                    className='cursor-pointer'
                  />
                </div>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
