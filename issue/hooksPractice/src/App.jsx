import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(()=>{
    const fetchData = () =>{
      fetch("http://localhost:3000/todos").then(async (data)=>{
      const json = await data.json();
      setTodos(json.todos)
    })
    }
    fetchData()
  }, [todos])

  return (
    <>
      <Todos todos={todos} setCount={setCount} count={count}></Todos>
    </>
  )
}

function Todos({todos, setCount, count}){
  return(
    <div>
      <button onClick={()=> {setCount(count++); console.log(count)}}>Count</button>
      {todos.map(todos => (
        <div key={todos._id}>
          title : {todos.title}
          <br />
          description : {todos.description}
          <br />
          <br />
        </div>
      ))}
    </div>
  )
}

export default App
