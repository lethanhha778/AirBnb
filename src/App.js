import router from "./router";
import { useDispatch, useSelector } from "react-redux";
import { CHECK_LOGIN } from "./redux/actions/AuthAction"
import { RouterProvider, } from "react-router-dom";
import { useEffect } from 'react';
import Loading from './components/isLoading';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import './App.css';

const App = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const dispatch = useDispatch();
  const { navigate } = router

  useEffect(() => {
    dispatch(CHECK_LOGIN())
  }, [dispatch])
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
    <>
      <Loading />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
