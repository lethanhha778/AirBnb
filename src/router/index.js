import {
  createBrowserRouter
} from "react-router-dom";
import React from "react";

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


export default createBrowserRouter([

  //admin
  {
    path: "/admin",
    element: <AdminTemplate />,
    requiredLogin: false,
    children: [
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

    ]
  },

]);