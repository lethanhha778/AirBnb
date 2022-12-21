import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, DatePicker, InputNumber, Modal } from 'antd';
import { addBookingAction, setAlertBookingAction } from '../../redux/actions/BookingRoomAction';
import roomService from '../../service/RoomService';

export default function AddBookingRoom() {
    let { arletContent } = useSelector(state => state.bookingAdminReducer);
    let dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (arletContent[0] !== '') {
            info()
        }
    }, [arletContent]);

    const formik = useFormik({
        initialValues: {
            maPhong: 0,
            ngayDen: '',
            ngayDi: '',
            soLuongKhach: 0,
            maNguoiDung: 0
        },
        validationSchema: Yup.object({
            maPhong: Yup.number().typeError("Mã phòng không đúng định dạng").min(1, "Mã phòng không hợp lệ")
                .test("Mã phòng", "Mã phòng không tồn tại", async (values) => {
                    return await roomService.detailRoom(values).then((result) => {
                        return true;
                    }).catch((err) => {
                        return false;
                    });
                }),
            ngayDen: Yup.string().required("Ngày đến không được để trống"),
            ngayDi: Yup.string().required("Ngày đi không được để trống"),
            soLuongKhach: Yup.number().typeError("Số lượng khách không đúng định dạng").min(1, "Số lượng khách phải lớn hơn 0"),
            maNguoiDung: Yup.number().typeError("Mã người dùng không đúng định dạng").min(1, "Mã người dùng phải lớn hơn 0"),
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
                    <p>{arletContent[0]}</p>
                </div>
            ),
            onOk() {
                let action = setAlertBookingAction(['', 0]);
                dispatch(action);
                if (arletContent[1] === 200) {
                    navigate('/admin/bookingrooms');
                }
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
                <Form.Item label="Ngày đến" name="ngayDen" validateStatus="error" help={formik.touched.ngayDen && formik.errors.ngayDen ? (formik.errors.ngayDen) : null}>
                    <DatePicker onChange={(date) => formik.setFieldValue('ngayDen', dayjs(date).format('YYYY-MM-DDTHH:mm:ss'))} format='DD/MM/YYYY' onBlur={formik.handleBlur} />
                </Form.Item>
                <Form.Item label="Ngày đi" name="ngayDi" validateStatus="error" help={formik.touched.ngayDi && formik.errors.ngayDi ? (formik.errors.ngayDi) : null}>
                    <DatePicker onChange={(date) => formik.setFieldValue('ngayDi', dayjs(date).format('YYYY-MM-DDTHH:mm:ss'))} format='DD/MM/YYYY' onBlur={formik.handleBlur} />
                </Form.Item>
                <Form.Item label="Số lượng khách" name="soLuongKhach" validateStatus="error" help={formik.touched.soLuongKhach && formik.errors.soLuongKhach ? (formik.errors.soLuongKhach) : null}>
                    <InputNumber min={0} onChange={(value) => formik.setFieldValue('soLuongKhach', value)} onBlur={formik.handleBlur} />
                </Form.Item>
                <Form.Item label="Mã người dùng" name="maNguoiDung" validateStatus="error" help={formik.touched.maNguoiDung && formik.errors.maNguoiDung ? (formik.errors.maNguoiDung) : null}>
                    <InputNumber min={0} onChange={(value) => formik.setFieldValue('maNguoiDung', value)} onBlur={formik.handleBlur} />
                </Form.Item>
                <Form.Item label="Button">
                    <Button htmlType="submit">Đặt phòng</Button>
                </Form.Item>
            </Form>
        </div>
    )
}