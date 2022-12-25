import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Upload, Modal } from 'antd';
import { getLocationAction, setAlertLocationAction, updateLocationAction, upImageLocationAction } from '../../redux/actions/LocationAction';


export default function EditLocation() {
  let { id } = useParams();
  let { location, arletContent } = useSelector(state => state.locationAdminReducer);
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
    getLocationAPI();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Object.keys(location).length !== 0) {
      setfileList([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: location.hinhAnh,
      }]);
      form.setFieldsValue(location);
      formik.setValues(location);
    }
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (arletContent[0] !== '') {
      info();
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
      let action = updateLocationAction(values, location.id);
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

  let getLocationAPI = () => {
    let action = getLocationAction(id);
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
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
        form={form}>
        <Form.Item label="Vị trí" name="tenViTri" validateStatus="error" help={formik.touched.tenViTri && formik.errors.tenViTri ? (formik.errors.tenViTri) : null}>
          <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item label="Tỉnh thành" name="tinhThanh" validateStatus="error" help={formik.touched.tinhThanh && formik.errors.tinhThanh ? (formik.errors.tinhThanh) : null}>
          <Input onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </Form.Item>
        <Form.Item label="Quốc gia" name="quocGia" validateStatus="error" help={formik.touched.quocGia && formik.errors.quocGia ? (formik.errors.quocGia) : null}>
          <Input onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </Form.Item>
        <Form.Item label="Hình ảnh" valuePropName="fileList">
          <Upload
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={fileList}
            beforeUpload={(file) => {
              let formData = new FormData();
              formData.append('formFile', file, file.name);
              let action = upImageLocationAction(formData, location.id);
              dispatch(action);
              return false;
            }}
            onChange={(value) => {
              formik.setFieldValue('hinhAnh', location.hinhAnh);
              setfileList(value.fileList);
            }}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button htmlType="submit">Cập nhập</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
