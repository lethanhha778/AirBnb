import {
  createBrowserRouter
} from "react-router-dom";
import React from "react"
import NotLoggedInLayout from '../layout/NotLoggedInLayout';
import LoggedInLayout from '../layout/LoggedInLayout';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound"
import RoomList from "../pages/RoomList";
import DetailRoom from "../pages/DetailRoom";

//admin
import AdminTemplate from '../layout/AdminTemplate';
import Users from '../pages/Admin/Users';
import AddUser from '../pages/Admin/AddUser';
import EditUser from '../pages/Admin/EditUser';
import Location from '../pages/Admin/Location';
import AddLocation from '../pages/Admin/AddLocation';
import EditLocation from '../pages/Admin/EditLocation';
import Rooms from '../pages/Admin/Rooms';
import AddRoom from '../pages/Admin/AddRoom';
import EditRoom from '../pages/Admin/EditRoom';
import BookingRoom from '../pages/Admin/BookingRoom';
import AddBookingRoom from '../pages/Admin/AddBookingRoom';
import EditBookingRoom from '../pages/Admin/EditBookingRoom';
import Comments from "../pages/Admin/Comments";
import AddComment from "../pages/Admin/AddComment";
import EditComment from "../pages/Admin/EditComment";
import HostHome from "../pages/HostHome";
import Profile from "../pages/Profile";


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
        path: '/',
        element: <Home />,
        requiredLogin: false
      },
      {
        path: "home",
        element: <Home />,
        requiredLogin: false
      },
      {
        path: "SearchPage/:id",
        element: <RoomList />,
        requiredLogin: false
      },
      {
        path: "detailRoom/:id",
        element: <DetailRoom />,
        requiredLogin: false,
      },
      {
        path: "hostHome",
        element: <HostHome />,
        requiredLogin: false
      },
      {
        path: "profile",
        element: <Profile />,
        requiredLogin: false
      }
    ]
  },
  //admin
  {
    path: "/admin",
    element: <AdminTemplate />,
    requiredLogin: false,
    children: [
      {
        path: '/admin',
        element: <Users />,
        requiredLogin: false
      },
      {
        path: "users",
        element: <Users />,
        requiredLogin: false
      },
      {
        path: "adduser",
        element: <AddUser />,
        requiredLogin: false
      },
      {
        path: "edituser/:id",
        element: <EditUser />,
        requiredLogin: false
      },
      {
        path: "locations",
        element: <Location />,
        requiredLogin: false
      },
      {
        path: "addlocation",
        element: <AddLocation />,
        requiredLogin: false
      },
      {
        path: "editlocation/:id",
        element: <EditLocation />,
        requiredLogin: false
      },
      {
        path: "rooms",
        element: <Rooms />,
        requiredLogin: false
      },
      {
        path: "addroom",
        element: <AddRoom />,
        requiredLogin: false
      },
      {
        path: "editroom/:id",
        element: <EditRoom />,
        requiredLogin: false
      },
      {
        path: "bookingrooms",
        element: <BookingRoom />,
        requiredLogin: false
      },
      {
        path: "addbookingroom",
        element: <AddBookingRoom />,
        requiredLogin: false
      },
      {
        path: "editbookingroom/:id",
        element: <EditBookingRoom />,
        requiredLogin: false
      },
      {
        path: "comments",
        element: <Comments />,
        requiredLogin: false
      },
      {
        path: "addComment",
        element: <AddComment />,
        requiredLogin: false
      },
      {
        path: "editComment/:id",
        element: <EditComment />,
        requiredLogin: false
      },
    ]
  },

]);