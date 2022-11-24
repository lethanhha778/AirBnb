import { createBrowserHistory } from 'history';
import './App.css';
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
    if (requiredLogin && !loggedIn) {
      navigate("/auth/login");
    }
  }, [loggedIn, navigate]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
