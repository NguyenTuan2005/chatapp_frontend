import {RouterProvider} from "react-router";
import {router} from "./routers/Router.tsx";

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
