import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Form, Button, DatePicker, InputNumber, Modal } from 'antd';
import { getBookingAction, setAlertBookingAction, updateBookingAction } from '../../redux/actions/BookingRoomAction';
import { useParams } from 'react-router-dom';

export default function EditBookingRoom() {
    let { id } = useParams()
    let { booking, arletContent } = useSelector(state => state.bookingReducer)
    let dispatch = useDispatch();
    const [form] = Form.useForm();
    useEffect(() => {
        getBookingAPI()
    }, [])

    useEffect(() => {
        if (Object.keys(booking).length !== 0) {
            formik.setValues(booking);
            form.setFieldsValue({
                maPhong: booking.maPhong,
                ngayDen: dayjs(dayjs(booking.ngayDen), 'DD/MM/YYYY'),
                ngayDi: dayjs(dayjs(booking.ngayDi), 'DD/MM/YYYY'),
                soLuongKhach: booking.soLuongKhach,
                maNguoiDung: booking.maNguoiDung,
            });
        }
    }, [booking]);

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
            maNguoiDung: 0,
        },
        validationSchema: Yup.object({
            maPhong: Yup.string().required("Mã phòng không được để trống"),
        }),
        onSubmit: values => {
            let action = updateBookingAction(values, booking.id);
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

    let getBookingAPI = () => {
        let action = getBookingAction(id);
        dispatch(action);
    }

    return (
        <div style={{ padding: '15px' }}>
            <h2 >Cập nhập đặt phòng</h2>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
                form={form}>
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
                    <Button htmlType="submit">Cập nhập</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
