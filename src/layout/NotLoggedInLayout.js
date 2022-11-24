import { Outlet } from 'react-router-dom';

const NotLoggedInLayout = () => {
  return (<div className="not-logged-in"><Outlet /></div>)
}

export default NotLoggedInLayout