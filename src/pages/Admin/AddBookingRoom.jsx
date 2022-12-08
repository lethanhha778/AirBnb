import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, DatePicker, InputNumber, Modal } from 'antd';
import { addBookingAction, setAlertBookingAction } from '../../redux/actions/BookingRoomAction';

export default function AddBookingRoom() {
    let { arletContent } = useSelector(state => state.bookingReducer)

    let dispatch = useDispatch();

    useEffect(() => {
        if (arletContent !== '') {
            info()
        }
    }, [arletContent])

    const formik = useFormik({
        initialValues: {
            maPhong: 0,
            ngayDen: '',
            ngayDi: '',
            soLuongKhach: 0,
            maNguoiDung: 0
        },
        validationSchema: Yup.object({
            maPhong: Yup.string().required("Mã phòng không được để trống"),
        }),
        onSubmit: values => {
            console.log(values);
            let action = addBookingAction(values);
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
                let action = setAlertBookingAction('');
                dispatch(action);
            },
        });
    };

    return (
        <div style={{ padding: '15px' }}>
            <h2>Đặt phòng</h2>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
                initialValues={formik.values}>
                <Form.Item label="Mã phòng" name="maPhong" validateStatus="error" help={formik.touched.maPhong && formik.errors.maPhong ? (formik.errors.maPhong) : null}>
                    <InputNumber min={0} onChange={(value) => formik.setFieldValue('maPhong', value)} onBlur={formik.handleBlur} />
                </Form.Item>
                <Form.Item label="Ngày đến" name="ngayDen">
                    <DatePicker onChange={(date) => formik.setFieldValue('ngayDen', dayjs(date).format('YYYY-MM-DDTHH:mm:ss'))} format='DD/MM/YYYY' />
                </Form.Item>
                <Form.Item label="Ngày đi" name="ngayDi">
                    <DatePicker onChange={(date) => formik.setFieldValue('ngayDi', dayjs(date).format('YYYY-MM-DDTHH:mm:ss'))} format='DD/MM/YYYY' />
                </Form.Item>
                <Form.Item label="Số lượng khách" name="soLuongKhach">
                    <InputNumber min={0} onChange={(value) => formik.setFieldValue('soLuongKhach', value)} />
                </Form.Item>
                <Form.Item label="Mã người dùng" name="maNguoiDung">
                    <InputNumber min={0}  onChange={(value) => formik.setFieldValue('maNguoiDung', value)} />
                </Form.Item>
                <Form.Item label="Button">
                    <Button htmlType="submit">Đặt phòng</Button>
                </Form.Item>
            </Form>
        </div>
    )
}