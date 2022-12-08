import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Input, Button, DatePicker, Select, Modal } from 'antd';
import { getUserAction, setAlertUserAction, updateUserAction } from '../../redux/actions/UserAction';
import { useParams } from 'react-router-dom';

export default function EditUser() {
  let { id } = useParams();
  let { user, arletContent } = useSelector(state => state.userReducer);
  let dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    getUserAPI();
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        birthday: dayjs(user.birthday, 'DD/MM/YYYY'),
        gender: user.gender,
        role: user.role,
      });
      formik.setValues(user);
    }
  }, [user]);

  useEffect(() => {
    if (arletContent !== '') {
      info()
    }
  }, [arletContent]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      birthday: '',
      gender: '',
      role: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tên không được để trống"),
    }),
    onSubmit: values => {
      values = { ...values, "birthday": dayjs(dayjs(user.birthday), 'DD/MM/YYYY') }
      let action = updateUserAction(values, user.id);
      dispatch(action);
    },
  });

  let info = () => {
    Modal.info({
      title: 'Thông báo',
      content: (
        <div>
          <p>{arletContent}</p>
        </div>
      ),
      onOk() {
        let action = setAlertUserAction('');
        dispatch(action);
      },
    });
  };

  let getUserAPI = () => {
    let action = getUserAction(id);
    dispatch(action);
  }

  return (
    <div style={{ padding: '15px' }}>
      <h2 >Cập nhập thông tin</h2>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
        form={form}>
        <Form.Item label="Tên" name="name" validateStatus="error" help={formik.touched.name && formik.errors.name ? (formik.errors.name) : null}>
          <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mật khẩu" name="password">
          <Input.Password
            onChange={formik.handleChange}
            placeholder="Nhập mật khẩu"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone">
          <Input onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Sinh nhật" name="birthday">
          <DatePicker onChange={(date) => formik.setFieldValue('birthday', date)} format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item label="Giới tính" name="gender" >
          <Select
            style={{ width: 120 }}
            onChange={(value) => formik.setFieldValue('gender', value)}
            options={[
              {
                value: true,
                label: 'Nam',
              },
              {
                value: false,
                label: 'Nữ',
              },

            ]}
          />
        </Form.Item>
        <Form.Item label="Phân quyền" name="role">
          <Select
            style={{ width: 120 }}
            onChange={(value) => formik.setFieldValue('role', value)}
            options={[
              {
                value: 'ADMIN',
                label: 'ADMIN',
              },
              {
                value: 'USER',
                label: 'USER',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Button">
          <Button htmlType="submit">Cập nhập</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
