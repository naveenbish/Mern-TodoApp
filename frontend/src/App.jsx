import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { home, signin } from "./routes/routes";
import Signup from "./Containers/Signup";
import Home from "./Containers/Home";
import Signin from "./Containers/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: home,
    element: <Home />,
  },
  {
    path: signin,
    element: <Signin />,
  },
]);

function App() {
  return <>{<RouterProvider router={router} />}</>;
}

export default App;
