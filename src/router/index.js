import {
  createBrowserRouter,
} from "react-router-dom";

import NotLoggedInLayout from '../layout/NotLoggedInLayout';
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomeLayout from '../layout/HomeLayout';

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
    element: <HomeLayout />,
    requiredLogin: true,
    children: []
  },
]);