import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Input, Button, DatePicker, Select, Modal } from 'antd';
import { addUserAction, setAlertUserAction } from '../../redux/actions/UserAction';

export default function AddUser() {
    let { arletContent } = useSelector(state => state.userReducer)

    let dispatch = useDispatch();

    useEffect(() => {
        if (arletContent !== '') {
            info()
        }
    }, [arletContent])

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
            name: Yup.string().required("Tên không được để trống"),
        }),
        onSubmit: values => {
            console.log(values);
            let action = addUserAction(values);
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

    return (
        <div style={{ padding: '15px' }}>
            <h2>Thêm tài khoản</h2>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
                initialValues={formik.values}>
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
                    <DatePicker onChange={(date, dateString) => formik.setFieldValue('birthday', dateString)} format='DD/MM/YYYY' />
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
