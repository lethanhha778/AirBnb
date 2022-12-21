import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../redux/actions/AuthAction";
import { useNavigate, NavLink } from "react-router-dom";
import { openCustomNotificationWithIcon } from "../../util/func";
import "antd/dist/reset.css";
import "./style.scss";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.AuthReducer.loading);
  const error = useSelector((state) => state.AuthReducer.error);
  const loggedIn = useSelector((state) => state.AuthReducer.loggedIn);
  useEffect(() => {
    if (loggedIn) {
      openCustomNotificationWithIcon(
        "success",
        "Login Sucess",
        "Congratulations, you have successfully logged in"
      );
      if (localStorage.getItem("urlRegister") === null) {
        navigate(-1)
      }
      else {
        navigate('/home');
        localStorage.removeItem('urlRegister')
      }
    }
  }, [loggedIn, navigate]);

  const onFinish = (values) => {
    dispatch(LOGIN(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-page">
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img src="/images/banner-login.png" alt="Login" />
          </div>
          <Form
            id="login-form"
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p className="form-title">Welcome back</p>
            <p>Login to book room</p>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              LOGIN
            </Button>
            <p className="login-page__error">{error}</p>
            <NavLink
              to="/auth/register"
              className={"login-page__linkto-register"}
            >
              Create New Account
            </NavLink>
          </Form>
        </div>
      </div>
    </div>
  );
}
