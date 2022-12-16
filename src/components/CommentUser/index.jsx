import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postComment } from '../../redux/actions/CommentAction'
import { listUserAction } from '../../redux/actions/UserAction'
import { Rate, Input, Form, Button } from 'antd';
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import './style.scss'


function CommnetUser(props) {
  const navigate = useNavigate()
  const loggedIn = useSelector((state) => state.AuthReducer.loggedIn);
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('render');
    const action = listUserAction()
    dispatch(action)
  }, [])

  const { arrUser } = useSelector(state => state.userAdminReducer)
  console.log(arrUser)
  const [form] = Form.useForm();
  const user = (JSON.parse(localStorage.getItem('USER_INFO')))
  const arrCM = []
  const maPhong = Number(props.maPhong)
  let arrComment = props.arr
  console.log(props);
  let arrCommentUser = []

  // duyệt lấy cmt của phòng từ data all comment
  for (let i = 0; i < arrComment?.length; i++) {
    if (arrComment[i].maPhong === maPhong) {
      arrCM.push(arrComment[i])
    }
  }

  // lọc ra comment có user còn tồn tại để render
  for (let i = 0; i < arrUser?.length; i++) {
    for (let j = 0; j < arrCM?.length; j++) {
      if (arrUser[i].id === arrCM[j].maNguoiBinhLuan) {
        // console.log()
        let arr = { ...arrUser[i], title: arrCM[j] }
        arrCommentUser.push(arr)
      }
    }
  }
  console.log('mảng CM', arrCommentUser);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const onFinish = (values) => {
    if (!loggedIn) {
      navigate("/auth/login")
    } else {
      const contentComment = {
        maPhong: maPhong,
        maNguoiBinhLuan: user.id,
        ngayBinhLuan: date,
        noiDung: values.noiDung,
        saoBinhLuan: values.saoBinhLuan
      }
      dispatch(postComment(contentComment))
      form.resetFields();
    }
  };
  const renderComment = () => {
    return arrCommentUser?.map((comment, index) => {
      return <div key={index} className="comment">
        <div className='user'>
          <img className='img-user' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU" alt="" />
          <div className='user-name'>
            <h5 className='d-flex'>{comment.name} <span className='d-flex align-items-center' >({comment.title.saoBinhLuan}<AiFillStar style={{ color: 'yellow' }} />) </span></h5>
            <h6>{comment.title.ngayBinhLuan}</h6>
          </div>
        </div>
        <h5>
          {comment.title.noiDung}
        </h5>
      </div >
    })
  }
  return (
    <div className='comment-container'>
      <h5>{arrCommentUser?.length} Đánh Giá</h5>
      <div className='item-comment'>
        {renderComment()}
      </div>
      <div className='rate-comment'>
        <h4 className='fw-bold mt-4'>Hãy Đánh Giá Cảm Nhận Của Bạn</h4>
        <Form
          form={form}
          name="validate_other"
          onFinish={onFinish}
          initialValues={{
            rate: 3.5,
          }}>
          <Form.Item name="saoBinhLuan" label="Rate">
            <Rate />
          </Form.Item>
          <Form.Item name="noiDung" label="Bình Luận">
            <Input.TextArea allowClear={true} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit"
              className='btn-comment'> <span>Bình Luận</span>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default memo(CommnetUser)
