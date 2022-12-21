import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Form, Input, InputNumber, Switch, Button, Modal } from 'antd';
import { addRoomAction, setAlertRoomAction } from '../../redux/actions/RoomAction';
import locationService from '../../service/LocationService';
const { TextArea } = Input;

export default function AddLocation() {
    let { arletContent } = useSelector(state => state.roomAdminReducer)
    let dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (arletContent[0] !== '') {
            info()
        }
    }, [arletContent]);

    const formik = useFormik({
        initialValues: {
            tenPhong: '',
            khach: 0,
            phongNgu: 0,
            giuong: 0,
            phongTam: 0,
            moTa: '',
            giaTien: 0,
            mayGiat: false,
            banLa: false,
            tivi: false,
            dieuHoa: false,
            wifi: false,
            bep: false,
            doXe: false,
            hoBoi: false,
            banUi: false,
            maViTri: 0,
            hinhAnh: ''
        },
        validationSchema: Yup.object({
            tenPhong: Yup.string().required("Tên phòng không được để trống"),
            moTa: Yup.string().required("Mô tả không được để trống"),
            khach: Yup.number().typeError("Số lượng khách không đúng định dạng").min(1, "Số lượng khách không hợp lệ"),
            phongNgu: Yup.number().typeError("Số lượng phòng ngủ không đúng định dạng").min(1, "Số lượng phòng ngủ không hợp lệ"),
            giuong: Yup.number().typeError("Số lượng giường không đúng định dạng").min(1, "Số lượng giường không hợp lệ"),
            phongTam: Yup.number().typeError("Số lượng phòng tắm không đúng định dạng").min(1, "Số lượng phòng tắm không hợp lệ"),
            maViTri: Yup.number().typeError("Mã vị trí không đúng định dạng").min(1, "Mã vị trí không hợp lệ")
                .test("Mã vị trí", "Mã vị trí không tồn tại", async (values) => {
                    return await locationService.detailLocation(values).then((result) => {
                        return true;
                    }).catch((err) => {
                        return false;
                    });
                }),
        }),
        onSubmit: values => {
            console.log(values);
            let action = addRoomAction(values);
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
                let action = setAlertRoomAction(['', 0]);
                dispatch(action);
                if (arletContent[1] === 200) {
                    navigate('/admin/rooms');
                }
            },
        });
    };

    return (
        <div style={{ padding: '15px' }}>
            <h2>Thêm Phòng</h2>
            <Form layout="horizontal" onFinish={formik.handleSubmit}
                initialValues={formik.values}>
                <div style={{ padding: '0 3rem' }}>
                    <Row justify="center">
                        <Col span={24}>
                            <Form.Item label="Tên phòng" name="tenPhong" validateStatus="error" help={formik.touched.tenPhong && formik.errors.tenPhong ? (formik.errors.tenPhong) : null}>
                                <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Mô tả" name="moTa" validateStatus="error" help={formik.touched.moTa && formik.errors.moTa ? (formik.errors.moTa) : null}>
                                <TextArea rows={4} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={12} >
                            <Form.Item label="Số khách" name="khach" validateStatus="error" help={formik.touched.khach && formik.errors.khach ? (formik.errors.khach) : null}>
                                <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('khach', value)} onBlur={formik.handleBlur} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="Số phòng ngủ" name="phongNgu" validateStatus="error" help={formik.touched.phongNgu && formik.errors.phongNgu ? (formik.errors.phongNgu) : null}>
                                <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('phongNgu', value)} onBlur={formik.handleBlur} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="Số giường" name="giuong" validateStatus="error" help={formik.touched.giuong && formik.errors.giuong ? (formik.errors.giuong) : null}>
                                <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('giuong', value)} onBlur={formik.handleBlur} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="Số phòng tắm" name="phongTam" validateStatus="error" help={formik.touched.phongTam && formik.errors.phongTam ? (formik.errors.phongTam) : null}>
                                <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('phongTam', value)} onBlur={formik.handleBlur} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="Giá tiền" name="giaTien">
                                <InputNumber min={0} onChange={(value) => formik.setFieldValue('giaTien', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="Mã vị trí" name="maViTri" validateStatus="error" help={formik.touched.maViTri && formik.errors.maViTri ? (formik.errors.maViTri) : null}>
                                <InputNumber min={0} onChange={(value) => formik.setFieldValue('maViTri', value)} onBlur={formik.handleBlur} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={8} >
                            <Form.Item label="Máy giặt" valuePropName="checked" name="mayGiat">
                                <Switch onChange={(value) => formik.setFieldValue('mayGiat', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="Bàn là" valuePropName="checked" name="banLa">
                                <Switch onChange={(value) => formik.setFieldValue('banLa', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="Ti vi" valuePropName="checked" name="tivi">
                                <Switch onChange={(value) => formik.setFieldValue('tivi', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="Điều hòa" valuePropName="checked" name="dieuHoa">
                                <Switch onChange={(value) => formik.setFieldValue('dieuHoa', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="Wifi" valuePropName="checked" name="wifi">
                                <Switch onChange={(value) => formik.setFieldValue('wifi', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="Bếp" valuePropName="checked" name="bep">
                                <Switch onChange={(value) => formik.setFieldValue('bep', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="Đỗ xe" valuePropName="checked" name="doXe">
                                <Switch onChange={(value) => formik.setFieldValue('doXe', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="Hồ bơi" valuePropName="checked" name="hoBoi">
                                <Switch onChange={(value) => formik.setFieldValue('hoBoi', value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Button">
                        <Button htmlType="submit">Thêm Phòng</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}
