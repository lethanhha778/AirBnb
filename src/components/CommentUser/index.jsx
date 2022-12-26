import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postComment } from '../../redux/actions/CommentAction'
import { listUserAction } from '../../redux/actions/UserAction'
import { Rate, Input, Form } from 'antd';
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { openCustomNotificationWithIcon } from '../../util/func';
import './style.scss'

function CommnetUser(props) {
	const navigate = useNavigate()
	const { loggedIn } = useSelector((state) => state.AuthReducer);
	const { arrUser } = useSelector(state => state.userAdminReducer)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(listUserAction())
	}, [dispatch])
	const [form] = Form.useForm();
	const user = (JSON.parse(localStorage.getItem('USER_INFO')))
	const arrCMFilter = []
	const maPhong = Number(props.maPhong)
	const arrComment = props.arr
	let arrCommentUser = []
	// duyệt lấy cmt của phòng từ data all comment
	for (let i = 0; i < arrComment?.length; i++) {
		if (arrComment[i].maPhong === maPhong) {
			arrCMFilter.push(arrComment[i])
		}
	}
	// lọc ra comment có user còn tồn tại để render
	for (let i = 0; i < arrUser?.length; i++) {
		for (let j = 0; j < arrCMFilter?.length; j++) {
			if (arrUser[i].id === arrCMFilter[j].maNguoiBinhLuan) {
				let arr = { ...arrUser[i], title: arrCMFilter[j] }
				arrCommentUser.push(arr)
			}
		}
	}
	const current = new Date();
	const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
	const onFinish = (values) => {
		if (!loggedIn) {
			navigate("/auth/login")
		}
		else if (values.noiDung === '') {
			console.log(1)
			openCustomNotificationWithIcon(
				"warning",
				"Failed",
				"Bạn Chưa Nhập Nội Dung"
			)
		}
		else {
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
						<h5 className='d-flex'>{(comment.name).charAt(0).toUpperCase() + (comment.name).slice(1)}  <span className='d-flex align-items-center mx-1' > ({comment.title.saoBinhLuan}<AiFillStar style={{ color: 'yellow' }} />) </span></h5>
						<h6>{comment.title.ngayBinhLuan}</h6>
					</div>
				</div>
				<h5 className='content'>
					{comment.title.noiDung}
				</h5>
			</div >
		})
	}
	return (
		<div className='comment-container'>
			<h3>{arrCommentUser?.length} Đánh Giá</h3>
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
						saoBinhLuan: 3,
						noiDung: ''
					}}>
					<Form.Item name="saoBinhLuan" label="Rate">
						<Rate />
					</Form.Item>
					<Form.Item name="noiDung" label="Bình Luận">
						<Input.TextArea allowClear={true} />
					</Form.Item>
					<Form.Item className='item-btn'>
						<button type="submit"
							className='btn-comment'> <span>Bình Luận</span>
						</button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
export default memo(CommnetUser)
