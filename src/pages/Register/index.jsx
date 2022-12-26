import React from "react";
import { Form, Input, Button, Radio, DatePicker } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import "./style.scss";
import AuthService from "../../service/AuthService";
import { openCustomNotificationWithIcon } from "../../util/func";

export default function Register() {
  const navigation = useNavigate();
  localStorage.setItem('urlRegister', JSON.stringify({ url: `${window.location.href}` }))

  const onFinish = async (values) => {
    try {
      const res = await AuthService.register({
        ...values,
        birthday: values.birthday.format("DD/MM/YYYY"),
      });
      if (res.status === 200) {
        openCustomNotificationWithIcon(
          "success",
          "Register Sucess",
          "Congratulations, you have successfully registered an account. Please login to continue using the app"
        );
        navigation("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="signup-page">
      <div className="signup-page">
        <div className="signup-box">
          <div className="illustration-wrapper">
            <img src="/images/banner-login.png" alt="Login" />
          </div>
          <Form
            id="signup-form"
            name="signup-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p className="form-title">SignUp</p>
            <p>SignUp to book room</p>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
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

            <Form.Item name="phone">
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item name="birthday">
              <DatePicker placeholder="BirthDay" format='DD/MM/YYYY'/>
            </Form.Item>
            <Form.Item name="gender">
              <Radio.Group>
                <Radio value="true"> Male </Radio>
                <Radio value="false"> FeMale </Radio>
              </Radio.Group>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
              loading={false}
            >
              SignUp
            </Button>
            <NavLink to="/auth/login" className={"signup-page__linkto-login"}>
              Login now
            </NavLink>
          </Form>
        </div>
      </div>
    </div>
  );
}
