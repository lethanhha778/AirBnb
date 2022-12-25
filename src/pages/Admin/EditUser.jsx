import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, DatePicker, Select, Upload, Modal } from 'antd';
import { getUserAction, setAlertUserAction, updateUserAction, upImageUserAction } from '../../redux/actions/UserAction';
import { useParams } from 'react-router-dom';

export default function EditUser() {
  let { id } = useParams();
  let { user, arletContent } = useSelector(state => state.userAdminReducer);
  let idAuth = useSelector(state => state.AuthReducer).user.id;
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let [fileList, setfileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: '',
    },
  ]);
  const [form] = Form.useForm();
  useEffect(() => {
    getUserAPI();
  }, [id]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setfileList([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: user.avatar,
      }]);
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        password: '',
        phone: user.phone,
        birthday: dayjs(user.birthday, 'DD/MM/YYYY'),
        gender: user.gender,
        role: user.role,
      });
      formik.setValues(user);
    }
  }, [user]);

  useEffect(() => {
    if (arletContent[0] !== '') {
      info();
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
      name: Yup.string().required("Tên không được để trống").matches(/^[A-Z a-z]+$/, "Tên không đúng định dạng"),
      email: Yup.string().required("Email không được để trống").email("Email chưa đúng định dạng"),
      password: Yup.string().required("Mật khẩu không được để trống").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, "Mật khẩu không đúng định dạng"),
      phone: Yup.string().required("Số điện thoại không được để trống").matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, "Số điện thoại không đúng định dạng"),
      birthday: Yup.string().required("Ngày sinh không được để trống"),
    }),
    onSubmit: values => {
      values = { ...values, "birthday": dayjs(dayjs(values.birthday)).format('DD/MM/YYYY') }
      let action = updateUserAction(values, user.id);
      dispatch(action);
    },
  });

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  let info = () => {
    Modal.info({
      title: 'Thông báo',
      content: (
        <div>
          <p>{arletContent[0]}</p>
        </div>
      ),
      onOk() {
        let action = setAlertUserAction(['', 0]);
        dispatch(action);
        if (arletContent[1] === 200) {
          navigate('/admin/users');
        }
      },
    });
  };

  let getUserAPI = () => {
    let action = getUserAction(id);
    dispatch(action);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div style={{ padding: '15px' }}>
      <h2 >Cập nhập thông tin người dùng</h2>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
        form={form}>
        <Form.Item label="Tên" name="name" validateStatus="error" help={formik.touched.name && formik.errors.name ? (formik.errors.name) : null}>
          <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item label="Email" name="email" validateStatus="error" help={formik.touched.email && formik.errors.email ? (formik.errors.email) : null}>
          <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item label="Mật khẩu" name="password" validateStatus="error" help={formik.touched.password && formik.errors.password ? (formik.errors.password) : null}>
          <Input.Password
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone" validateStatus="error" help={formik.touched.phone && formik.errors.phone ? (formik.errors.phone) : null}>
          <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item label="Sinh nhật" name="birthday" validateStatus="error" help={formik.touched.birthday && formik.errors.birthday ? (formik.errors.birthday) : null}>
          <DatePicker onChange={(date) => formik.setFieldValue('birthday', date)} format='DD/MM/YYYY' onBlur={formik.handleBlur} />
        </Form.Item>
        {/* <Form.Item label="Hình ảnh" name="avatar">
        <img style={{width: '150px'}} src={form.getFieldValue('avatar')} alt="" />
        </Form.Item> */}
        <Form.Item label="Hình ảnh" valuePropName="fileList">
          <Upload
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={fileList}
            beforeUpload={(file) => {
              if (Number(id) === Number(idAuth)) {
                let formData = new FormData();
                formData.append('formFile', file, file.name);
                let action = upImageUserAction(formData);
                dispatch(action);
              }
              return false;
            }}
            onChange={(value) => {
              if (Number(id) === Number(idAuth)) {
                formik.setFieldValue('avatar', user.avatar);
                setfileList(value.fileList);
              }
            }}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
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
