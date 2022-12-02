import { createBrowserHistory } from 'history';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import router from "./router"
import { useDispatch, useSelector } from "react-redux";
import { CHECK_LOGIN } from "./redux/actions/AuthAction"
import {
  RouterProvider,
} from "react-router-dom";
import { useEffect } from 'react';

export const history = createBrowserHistory()

const App = () => {
  const dispatch = useDispatch();
  const { navigate } = router

  dispatch(CHECK_LOGIN())
  const loggedIn = useSelector((state) => state.AuthReducer.loggedIn);

  useEffect(() => {
    const requiredLogin = router?.state?.matches.some(el => el.route.requiredLogin)
    console.log(requiredLogin)
    if (requiredLogin && !loggedIn) {
      navigate("/auth/login");
    }
    // if (requiredLogin && loggedIn) {
    //   navigate("/home");
    // }
  }, [loggedIn, navigate]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
