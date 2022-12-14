import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Form, Button, Input, DatePicker, InputNumber, Modal } from 'antd';
import { getCommentAction, setAlertCommentAction, updateCommentAction } from '../../redux/actions/CommentAction';
const { TextArea } = Input;

export default function EditComment() {
  let { id } = useParams();
  const navigate = useNavigate();
  let { arrComment, comment, arletContent } = useSelector(state => state.commentAdminReducer);
  if (arrComment.length === 0 ) navigate('/admin/comments');
  let dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    getCommentAPI()
  }, [])

  useEffect(() => {
    if (Object.keys(comment).length !== 0) {
      formik.setValues(comment);
      form.setFieldsValue({
        maPhong: comment.maPhong,
        maNguoiBinhLuan: comment.maNguoiBinhLuan,
        ngayBinhLuan: dayjs(comment.ngayBinhLuan, 'DD/MM/YYYY'),
        noiDung: comment.noiDung,
        saoBinhLuan: comment.saoBinhLuan,
      });
    }
  }, [comment]);

  useEffect(() => {
    if (arletContent[0] !== '') {
      info()
    }
  }, [arletContent])

  const formik = useFormik({
    initialValues: {
      maPhong: 0,
      maNguoiBinhLuan: 0,
      ngayBinhLuan: '',
      noiDung: '',
      saoBinhLuan: 0
    },
    validationSchema: Yup.object({
      maPhong: Yup.number().typeError("Mã phòng không đúng định dạng").min(1, "Mã phòng phải lớn hơn 0"),
      maNguoiBinhLuan: Yup.number().typeError("Mã người dùng không đúng định dạng").min(1, "Mã người dùng phải lớn hơn 0"),
      ngayBinhLuan: Yup.string().required("Ngày bình luận không được để trống"),
      noiDung: Yup.string().required("Nội dung không được để trống"),
      saoBinhLuan: Yup.number().typeError("Sao bình chọn không đúng định dạng"),
    }),
    onSubmit: values => {
      let action = updateCommentAction(values, comment.id);
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

  let getCommentAPI = () => {
    let action = getCommentAction(id);
    dispatch(action);
  }

  return (
    <div style={{ padding: '15px' }}>
      <h2 >Cập nhập bình luận</h2>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
        form={form}>
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
          <Button htmlType="submit">Cập nhập bình luận</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
