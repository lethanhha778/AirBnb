import {
  createBrowserRouter,
} from "react-router-dom";

import NotLoggedInLayout from '../layout/NotLoggedInLayout';
import LoggedInLayout from '../layout/LoggedInLayout';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound"

export default createBrowserRouter([
  {
    path: "/auth",
    element: <NotLoggedInLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        requiredLogin: false
      },
      {
        path: "register",
        element: <Register />,
        requiredLogin: false
      },
    ]
  },
  {
    path: "/",
    element: <LoggedInLayout />,
    requiredLogin: false,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <Home />,
        requiredLogin: false
      },
      {
        path:'/',
        element:<Home/>,
        requiredLogin:false
      }
    ]
  },
]);