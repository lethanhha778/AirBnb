import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Form, Button, DatePicker, InputNumber, Modal } from 'antd';
import { getBookingAction, setAlertBookingAction, updateBookingAction } from '../../redux/actions/BookingRoomAction';

export default function EditBookingRoom() {
    let { id } = useParams();
    let { booking, arletContent } = useSelector(state => state.bookingAdminReducer)
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        getBookingAPI();
        // eslint-disable-next-line
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
        // eslint-disable-next-line
    }, [booking]);

    useEffect(() => {
        if (arletContent[0] !== '') {
            info()
        }
        // eslint-disable-next-line
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
            maPhong: Yup.number().typeError("Mã phòng không đúng định dạng").min(1, "Mã phòng phải lớn hơn 0"),
            ngayDen: Yup.string().required("Ngày đến không được để trống"),
            ngayDi: Yup.string().required("Ngày đi không được để trống"),
            soLuongKhach: Yup.number().typeError("Số lượng khách không đúng định dạng").min(1, "Số lượng khách phải lớn hơn 0"),
            maNguoiDung: Yup.number().typeError("Mã người dùng không đúng định dạng").min(1, "Mã người dùng phải lớn hơn 0"),
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
                    <Button htmlType="submit">Cập nhập</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
