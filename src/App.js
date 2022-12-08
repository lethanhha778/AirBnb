import { createBrowserHistory } from 'history';
import './App.css';
import router from "./router";
import {
  RouterProvider,
} from "react-router-dom";
export const history = createBrowserHistory()

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
