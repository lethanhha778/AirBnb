import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { EditFilled , DeleteFilled } from '@ant-design/icons';
import { Button, Table, Modal } from 'antd';
import { listCommentAction, removeCommentAction, setAlertCommentAction } from '../../redux/actions/CommentAction';

export default function Comments() {
    let { arrComment, arletContent } = useSelector(state => state.commentAdminReducer);
    let { tableLoading } = useSelector(state => state.LoadingReducer);
    let dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      getListCommentAPI()
    }, []);

    useEffect(() => {
        if (arletContent[0] !== '') {
            info()
        }
    }, [arletContent]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Mã phòng',
            dataIndex: 'maPhong',
        },
        {
            title: 'Mã người dùng',
            dataIndex: 'maNguoiBinhLuan'
        },
        {
            title: 'Ngày bình luận',
            dataIndex: 'ngayBinhLuan'
        },
        {
            title: 'Nội dung',
            dataIndex: 'noiDung'
        },
        {
            title: 'Bình chọn (sao)',
            dataIndex: 'saoBinhLuan',
        },
        {
            title: 'Hàng động',
            dataIndex: '',
            render: (t, r) => <div>
                <EditFilled style={{ fontSize: '16px', color: '#1677ff', marginRight:'10px' }} onClick={() => {
                    navigate(`/admin/editcomment/${r.id}`);
                }}/>
                <DeleteFilled style={{ fontSize: '16px', color: '#ff4d4f' }} onClick={() => {
                    let action = removeCommentAction(r.id);
                    dispatch(action);
                }}/>
                </div>,
        },
    ];

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
            },
        });
    }

    let getListCommentAPI = () => {
        let action = listCommentAction();
        dispatch(action);
    }
    return (
        <div style={{ padding: '15px' }}>
            <h2 >Quản lý bình luận</h2>
            <Button  type="primary" style={{ marginBottom: '10px' }} onClick={() => {
                navigate('/admin/addcomment');
            }}>Thêm bình luận</Button>
            <Table rowKey='id' columns={columns} dataSource={arrComment} loading={tableLoading}/>
        </div>
    )
}