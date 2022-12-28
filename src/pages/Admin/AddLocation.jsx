import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Modal } from 'antd';
import { addLocationAction, setAlertLocationAction } from '../../redux/actions/LocationAction';

export default function AddLocation() {
    let { arletContent } = useSelector(state => state.LocationReducer);
    let dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (arletContent[0] !== '') {
            info()
        }
        // eslint-disable-next-line
    }, [arletContent]);

    const formik = useFormik({
        initialValues: {
            tenViTri: '',
            tinhThanh: '',
            quocGia: '',
            hinhAnh: '',
        },
        validationSchema: Yup.object({
            tenViTri: Yup.string().required("Vị trí không được để trống"),
            tinhThanh: Yup.string().required("Tỉnh thành không được để trống"),
            quocGia: Yup.string().required("Quốc gia không được để trống"),
        }),
        onSubmit: values => {
            let action = addLocationAction(values);
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
                let action = setAlertLocationAction(['', 0]);
                dispatch(action);
                if (arletContent[1] === 200) {
                    navigate('/admin/locations');
                }
            },
        });
    };

    return (
        <div style={{ padding: '15px' }}>
            <h2 >Thêm vị trí</h2>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
                initialValues={formik.values}>
                <Form.Item label="Vị trí" name="tenViTri" validateStatus="error" help={formik.touched.tenViTri && formik.errors.tenViTri ? (formik.errors.tenViTri) : null}>
                    <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </Form.Item>
                <Form.Item label="Tỉnh thành" name="tinhThanh" validateStatus="error" help={formik.touched.tinhThanh && formik.errors.tinhThanh ? (formik.errors.tinhThanh) : null}>
                    <Input onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                </Form.Item>
                <Form.Item label="Quốc gia" name="quocGia" validateStatus="error" help={formik.touched.quocGia && formik.errors.quocGia ? (formik.errors.quocGia) : null}>
                    <Input onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                </Form.Item>
                <Form.Item label="Button">
                    <Button htmlType="submit">Thêm vị trí</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
