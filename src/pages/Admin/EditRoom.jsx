import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Row, Form, Input, InputNumber, Switch, Button, Upload, Modal } from 'antd';
import { getRoomAction, setAlertRoomAction, updateRoomAction, upImageRoomAction } from '../../redux/actions/RoomAction';
const { TextArea } = Input;

export default function EditLocation() {
    let { id } = useParams()
    let { room, arletContent } = useSelector(state => state.RoomReducer);
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
        getRoomAPI();
        // eslint-disable-next-line
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
        // eslint-disable-next-line
    }, [room]);

    useEffect(() => {
        if (arletContent[0] !== '') {
            info()
        }
        // eslint-disable-next-line
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
            mayGiat: '',
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
            tenPhong: Yup.string().required("T??n ph??ng kh??ng ???????c ????? tr???ng"),
            moTa: Yup.string().required("M?? t??? kh??ng ???????c ????? tr???ng"),
            khach: Yup.number().typeError("S??? l?????ng kh??ch kh??ng ????ng ?????nh d???ng").min(1, "S??? l?????ng kh??ch ph???i l???n h??n 0"),
            phongNgu: Yup.number().typeError("S??? l?????ng ph??ng ng??? kh??ng ????ng ?????nh d???ng").min(1, "S??? l?????ng ph??ng ng??? ph???i l???n h??n 0"),
            giuong: Yup.number().typeError("S??? l?????ng gi?????ng kh??ng ????ng ?????nh d???ng").min(1, "S??? l?????ng gi?????ng ph???i l???n h??n 0"),
            phongTam: Yup.number().typeError("S??? l?????ng ph??ng t???m kh??ng ????ng ?????nh d???ng").min(1, "S??? l?????ng ph??ng t???m ph???i l???n h??n 0"),
            maViTri: Yup.number().typeError("M?? v??? tr?? kh??ng ????ng ?????nh d???ng").min(1, "M?? v??? tr?? ph???i l???n h??n 0"),
        }),
        onSubmit: values => {
            let action = updateRoomAction(values, room.id);
            dispatch(action);
        },
    });

    let info = () => {
        Modal.info({
            title: 'Th??ng b??o',
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
            <h2 >C???p nh???p th??ng tin ph??ng</h2>
            <Form layout="horizontal" onFinish={formik.handleSubmit}
                form={form}>
                <div style={{ padding: '0 3rem' }}>
                    <Row justify="center">
                        <Col span={24}>
                            <Form.Item label="T??n ph??ng" name="tenPhong" validateStatus="error" help={formik.touched.tenPhong && formik.errors.tenPhong ? (formik.errors.tenPhong) : null}>
                                <Input onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="M?? t???" name="moTa" validateStatus="error" help={formik.touched.moTa && formik.errors.moTa ? (formik.errors.moTa) : null}>
                                <TextArea rows={4} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="H??nh ???nh" valuePropName="fileList">
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
                            <Form.Item label="S??? kh??ch" name="khach" validateStatus="error" help={formik.touched.khach && formik.errors.khach ? (formik.errors.khach) : null}>
                                <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('khach', value)} onBlur={formik.handleBlur}/>
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="S??? ph??ng ng???" name="phongNgu" validateStatus="error" help={formik.touched.phongNgu && formik.errors.phongNgu ? (formik.errors.phongNgu) : null}>
                                <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('phongNgu', value)} onBlur={formik.handleBlur}/>
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="S??? gi?????ng" name="giuong" validateStatus="error" help={formik.touched.giuong && formik.errors.giuong ? (formik.errors.giuong) : null}>
                                <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('giuong', value)} onBlur={formik.handleBlur}/>
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="S??? ph??ng t???m" name="phongTam" validateStatus="error" help={formik.touched.phongTam && formik.errors.phongTam ? (formik.errors.phongTam) : null}>
                                <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('phongTam', value)} onBlur={formik.handleBlur}/>
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="Gi?? ti???n" name="giaTien">
                                <InputNumber min={0} onChange={(value) => formik.setFieldValue('giaTien', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Form.Item label="M?? v??? tr??" name="maViTri" validateStatus="error" help={formik.touched.maViTri && formik.errors.maViTri ? (formik.errors.maViTri) : null}>
                                <InputNumber min={0} onChange={(value) => formik.setFieldValue('maViTri', value)} onBlur={formik.handleBlur}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={8} >
                            <Form.Item label="M??y gi???t" valuePropName="checked" name="mayGiat">
                                <Switch onChange={(value) => formik.setFieldValue('mayGiat', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="B??n l??" valuePropName="checked" name="banLa">
                                <Switch onChange={(value) => formik.setFieldValue('banLa', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="Ti vi" valuePropName="checked" name="tivi">
                                <Switch onChange={(value) => formik.setFieldValue('tivi', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="??i???u h??a" valuePropName="checked" name="dieuHoa">
                                <Switch onChange={(value) => formik.setFieldValue('dieuHoa', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="Wifi" valuePropName="checked" name="wifi">
                                <Switch onChange={(value) => formik.setFieldValue('wifi', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="B???p" valuePropName="checked" name="bep">
                                <Switch onChange={(value) => formik.setFieldValue('bep', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="????? xe" valuePropName="checked" name="doXe">
                                <Switch onChange={(value) => formik.setFieldValue('doXe', value)} />
                            </Form.Item>
                        </Col>
                        <Col span={8} >
                            <Form.Item label="H??? b??i" valuePropName="checked" name="hoBoi">
                                <Switch onChange={(value) => formik.setFieldValue('hoBoi', value)} />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Form.Item label="Button">
                        <Button htmlType="submit">C???p nh???p</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}