import {
  createBrowserRouter,
} from "react-router-dom";

import NotLoggedInLayout from '../layout/NotLoggedInLayout';
import LoggedInLayout from '../layout/LoggedInLayout';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

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
    requiredLogin: true,
    children: [
      {
        path: "home",
        element: <Home />,
        requiredLogin: false
      },
    ]
  },
]);