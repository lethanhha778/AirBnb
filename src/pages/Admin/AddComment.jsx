import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Input, DatePicker, InputNumber, Modal } from 'antd';
import { addCommentAction, setAlertCommentAction } from '../../redux/actions/CommentAction';
import roomService from '../../service/RoomService';
import userService from '../../service/UserService';

const { TextArea } = Input;

export default function AddBookingRoom() {
  let { arletContent } = useSelector(state => state.CommentReducer);
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
      maPhong: 0,
      maNguoiBinhLuan: 0,
      ngayBinhLuan: '',
      noiDung: '',
      saoBinhLuan: 0
    },
    validationSchema: Yup.object({
      maPhong: Yup.number().typeError("Mã phòng không đúng định dạng").min(1, "Mã phòng không hợp lệ")
        .test("Mã phòng", "Mã phòng không tồn tại", async (values) => {
          return await roomService.detailRoom(values).then((result) => {
            return true;
          }).catch((error) => {
            return false;
          });
        }),
      maNguoiBinhLuan: Yup.number().typeError("Mã người dùng không đúng định dạng").min(1, "Mã người dùng không hợp lệ")
        .test("Mã người dùng", "Mã người dùng không tồn tại", async (values) => {
          return await userService.detailUser(values).then((result) => {
            return true;
          }).catch((error) => {
            return false;
          });
        }),
      ngayBinhLuan: Yup.string().required("Ngày bình luận không được để trống"),
      noiDung: Yup.string().required("Nội dung không được để trống"),
      saoBinhLuan: Yup.number().typeError("Sao bình chọn không đúng định dạng"),
    }),
    onSubmit: values => {
      let action = addCommentAction(values);
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
        let action = setAlertCommentAction(['', 0]);
        dispatch(action);
        if (arletContent[1] === 200) {
          navigate('/admin/comments');
        }
      },
    });
  };

  return (
    <div style={{ padding: '15px' }}>
      <h2 >Thêm bình luận</h2>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
        initialValues={formik.values}>
        <Form.Item label="Mã phòng" name="maPhong" validateStatus="error" help={formik.touched.maPhong && formik.errors.maPhong ? (formik.errors.maPhong) : null}>
          <InputNumber min={0} onChange={(value) => formik.setFieldValue('maPhong', value)} onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item label="Mã người dùng" name="maNguoiBinhLuan" validateStatus="error" help={formik.touched.maNguoiBinhLuan && formik.errors.maNguoiBinhLuan ? (formik.errors.maNguoiBinhLuan) : null}>
          <InputNumber min={0} onChange={(value) => formik.setFieldValue('maNguoiBinhLuan', value)} onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item label="Ngày bình luận" name="ngayBinhLuan" validateStatus="error" help={formik.touched.ngayBinhLuan && formik.errors.ngayBinhLuan ? (formik.errors.ngayBinhLuan) : null}>
          <DatePicker onChange={(date) => formik.setFieldValue('ngayBinhLuan', dayjs(date).format('DD/MM/YYYY'))} format='DD/MM/YYYY' onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item label="Nội dung" name="noiDung" validateStatus="error" help={formik.touched.noiDung && formik.errors.noiDung ? (formik.errors.noiDung) : null}>
          <TextArea rows={4} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item label="Bình chọn" name="saoBinhLuan" validateStatus="error" help={formik.touched.saoBinhLuan && formik.errors.saoBinhLuan ? (formik.errors.saoBinhLuan) : null}>
          <InputNumber min={0} max={5} onChange={(value) => formik.setFieldValue('saoBinhLuan', value)} onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item label="Button">
          <Button htmlType="submit">Thêm bình luận</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
