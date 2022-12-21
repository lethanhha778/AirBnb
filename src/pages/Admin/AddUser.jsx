import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Input, Button, DatePicker, Select, Modal } from 'antd';
import { addUserAction, setAlertUserAction } from '../../redux/actions/UserAction';
import userService from '../../service/UserService';

export default function AddUser() {

    let { arletContent } = useSelector(state => state.userAdminReducer)
    let dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (arletContent[0] !== '') {
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
            gender: true,
            role: "USER",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Tên không được để trống").matches(/^[A-Z a-z]+$/, "Tên không đúng định dạng"),
            email: Yup.string().required("Email không được để trống").email("Email chưa đúng định dạng")
                .test("Email", "Email đã tồn tại", async (values) => {
                    let check = await userService.listUser().then((result) => {
                        return result.data.content.map(item => item.email).includes(values);
                    });
                    return !check;
                }),
            password: Yup.string().required("Mật khẩu không được để trống").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, "Mật khẩu không đúng định dạng"),
            phone: Yup.string().required("Số điện thoại không được để trống").matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, "Số điện thoại không đúng định dạng"),
            birthday: Yup.string().required("Ngày sinh không được để trống"),
        }),
        onSubmit: values => {
            let action = addUserAction(values);
            dispatch(action);
        },
    });

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

    return (
        <div style={{ padding: '15px' }}>
            <h2>Thêm người dùng</h2>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
                initialValues={formik.values}>
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
                    <DatePicker onChange={(date, dateString) => formik.setFieldValue('birthday', dateString)} format='DD/MM/YYYY' onBlur={formik.handleBlur} />
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
                    <Button htmlType="submit">Thêm người dùng</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
