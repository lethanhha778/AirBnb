import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Row, Form, Input, InputNumber, Switch, Button,Upload, Modal } from 'antd';
import { getRoomAction, setAlertRoomAction, updateRoomAction, upImageRoomAction } from '../../redux/actions/RoomAction';
const { TextArea } = Input;

export default function EditLocation() {
    let { id } = useParams()
    let { room, arletContent } = useSelector(state => state.roomReducer);
    let dispatch = useDispatch();
    
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
        getRoomAPI();
    }, [])

    useEffect(() => {
        if (Object.keys(room).length !== 0) {
            setfileList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: room.hinhAnh,
            }]);
            form.setFieldsValue(room);
            formik.setValues(room);
        }
    }, [room]);

    useEffect(() => {
        if (arletContent !== '') {
            info()
        }
    }, [arletContent])

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const formik = useFormik({
        initialValues: {
            tenPhong: '',
            khach: '',
            phongNgu: '',
            giuong: '',
            phongTam: '',
            moTa: '',
            giaTien: '',
            mayGiat:'',
            banLa: '',
            tivi: '',
            dieuHoa: '',
            wifi: '',
            bep: '',
            doXe: '',
            hoBoi: '',
            banUi: '',
            maViTri: '',
            hinhAnh: '',
        },
        validationSchema: Yup.object({
            tenPhong: Yup.string().required("Vị trí không được để trống"),
        }),
        onSubmit: values => {
            let action = updateRoomAction(values, room.id);
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

    let getRoomAPI = () => {
        let action = getRoomAction(id);
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
            <h2 >Cập nhập thông tin vị trí</h2>
            <Form layout="horizontal" onFinish={formik.handleSubmit}
                form={form}>
                <div style={{ padding: '0 3rem' }}>
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
                        <Col span={24}>
                            <Form.Item label="Hình ảnh" valuePropName="fileList">
                                <Upload
                                    customRequest={dummyRequest}
                                    listType="picture-card"
                                    fileList={fileList}
                                    beforeUpload={(file) => {
                                        let formData = new FormData();
                                        formData.append('formFile', file, file.name);
                                        let action = upImageRoomAction(formData, room.id);
                                        dispatch(action);
                                        return false;
                                    }}
                                    onChange={(value) => {
                                        formik.setFieldValue('hinhAnh', room.hinhAnh);
                                        setfileList(value.fileList);
                                    }}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
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
                        <Button htmlType="submit">Cập nhập</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}