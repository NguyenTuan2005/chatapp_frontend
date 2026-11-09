import {RouterProvider} from "react-router";
import {router} from "./routers/Router.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "./store/Store.ts";
import {reLoginStorage, reloginThunk} from "./thunks/AuthThunk.ts";
import {KEY} from "./config/WSEventsEnum.ts";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (reLoginStorage.get(KEY) != null) {
      dispatch(reloginThunk());
    }
  }, [dispatch]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
