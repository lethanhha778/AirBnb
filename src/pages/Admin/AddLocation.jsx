import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Modal } from 'antd';
import { addLocationAction, setAlertLocationAction } from '../../redux/actions/LocationAction';

export default function AddLocation() {
    let { arletContent } = useSelector(state => state.locationReducer)

    let dispatch = useDispatch();

    useEffect(() => {
        if (arletContent !== '') {
            info()
        }
    }, [arletContent])

    const formik = useFormik({
        initialValues: {
            tenViTri: '',
            tinhThanh: '',
            quocGia: '',
            hinhAnh: '',
        },
        validationSchema: Yup.object({
            tenViTri: Yup.string().required("Vị trí không được để trống"),
        }),
        onSubmit: values => {
            console.log(values);
            let action = addLocationAction(values);
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
                let action = setAlertLocationAction('');
                dispatch(action);
            },
        });
    };

    return (
        <div style={{ padding: '15px' }}>
            <h2>Thêm vị trí</h2>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
                initialValues={formik.values}>
                <Form.Item label="Vị trí" name="tenViTri" validateStatus="error" help={formik.touched.tenViTri && formik.errors.tenViTri ? (formik.errors.tenViTri) : null}>
                    <Input onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                </Form.Item>
                <Form.Item label="Tỉnh thành" name="tinhThanh">
                    <Input onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Quốc gia" name="quocGia">
                    <Input onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Button">
                    <Button htmlType="submit">Thêm vị trí</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
