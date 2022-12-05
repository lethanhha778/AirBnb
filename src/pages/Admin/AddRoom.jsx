import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Form, Input, InputNumber, Switch, Button, Modal } from 'antd';
import { addRoomAction, setAlertRoomAction } from '../../redux/actions/RoomAction';
const { TextArea } = Input;

export default function AddLocation() {
    let { arletContent } = useSelector(state => state.roomReducer)

    let dispatch = useDispatch();

    useEffect(() => {
        if (arletContent !== '') {
            info()
        }
    }, [arletContent])

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
                    <p>{arletContent}</p>
                </div>
            ),
            onOk() {
                let action = setAlertRoomAction('');
                dispatch(action);
            },
        });
    };

    return (
        <div style={{ padding: '15px' }}>
            <h2>Thêm Phòng</h2>
            <Form  layout="horizontal" onFinish={formik.handleSubmit}
                initialValues={formik.values}>
                    <div style={{ padding: '0 3rem'  }}>
                <Row justify="center">
                    <Col span={24}>
                        <Form.Item label="Tên phòng" name="tenPhong" validateStatus="error" help={formik.touched.tenPhong && formik.errors.tenPhong ? (formik.errors.tenPhong) : null}>
                            <Input onChange={formik.handleChange} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Mô tả" name="moTa">
                            <TextArea rows={4} onChange={formik.handleChange} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={12} >
                        <Form.Item label="Số khách" name="khach">
                            <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('khach', value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item label="Số phòng ngủ" name="phongNgu">
                            <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('phongNgu', value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item label="Số giường" name="giuong">
                            <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('giuong', value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item label="Số phòng tắm" name="phongTam">
                            <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('phongTam', value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item label="Giá tiền" name="giaTien">
                            <InputNumber min={0} onChange={(value) => formik.setFieldValue('giaTien', value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item label="Mã vị trí" name="maViTri">
                            <InputNumber min={0} onChange={(value) => formik.setFieldValue('phongTam', value)} />
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
