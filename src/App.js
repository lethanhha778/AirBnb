import { createBrowserHistory } from 'history';
import './App.css';
import { Router, Switch } from 'react-router-dom';
import { AdminTemplate } from './layout/AdminTemplate';
import Admin from './pages/Admin';
import Users from './pages/Admin/Users';
import AddUser from './pages/Admin/AddUser';
import EditUser from './pages/Admin/EditUser';
import Location from './pages/Admin/Location';
import AddLocation from './pages/Admin/AddLocation';
import EditLocation from './pages/Admin/EditLocation';
import Rooms from './pages/Admin/Rooms';
import AddRoom from './pages/Admin/AddRoom';
import EditRoom from './pages/Admin/EditRoom';
import BookingRoom from './pages/Admin/BookingRoom';
import EditBookingRoom from './pages/Admin/EditBookingRoom';
import AddBookingRoom from './pages/Admin/AddBookingRoom';


export const history = createBrowserHistory()


function App() {
  return (
    <Router history={history}>
      <Switch>
        <AdminTemplate exact path="/admin" component={Admin}/>
        <AdminTemplate exact path="/admin/users" component={Users}/>
        <AdminTemplate exact path="/admin/adduser" component={AddUser}/>
        <AdminTemplate exact path="/admin/edituser/:id" component={EditUser}/>
        <AdminTemplate exact path="/admin/location" component={Location}/>
        <AdminTemplate exact path="/admin/addlocation" component={AddLocation}/>
        <AdminTemplate exact path="/admin/editlocation/:id" component={EditLocation}/>
        <AdminTemplate exact path="/admin/room" component={Rooms}/>
        <AdminTemplate exact path="/admin/addroom" component={AddRoom}/>
        <AdminTemplate exact path="/admin/editroom/:id" component={EditRoom}/>
        <AdminTemplate exact path="/admin/bookingroom" component={BookingRoom}/>
        <AdminTemplate exact path="/admin/addbookingroom" component={AddBookingRoom}/>
        <AdminTemplate exact path="/admin/editbookingroom/:id" component={EditBookingRoom}/>
      </Switch>
    </Router>
  );
}

export default App;
