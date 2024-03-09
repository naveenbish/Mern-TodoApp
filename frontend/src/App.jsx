import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { home} from './routes/routes'
import Signup from './Containers/Signup'
import Home from './Containers/Home'

const routerList = [
  {
    path : '/',
    element: <Signup />,
  },
  {
    path : home,
    element: <Home />,
  }
]

const router = createHashRouter(createRoutesFromElements(<>
  {routerList.map((item)=><Route path={item.path} element={item.element} />)}
</>))

function App() {
  return (
    <>
      {<RouterProvider router={router} />}
    </>
  );
}

export default App;
