import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EditFilled , DeleteFilled } from '@ant-design/icons';
import { Button, Table, Modal } from 'antd';
import { listRoomAction, removeRoomAction, setAlertRoomAction } from '../../redux/actions/RoomAction';

export default function Location() {
    let { arrRoom, arletContent } = useSelector(state => state.roomAdminReducer);
    let dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        getListRoomAPI()
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
            title: 'Tên phòng',
            dataIndex: 'tenPhong',
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            width: '40%',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'giaTien'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            width: '10%',
            render: (t, r) => <img style={{width: '150px'}} src={`${r.hinhAnh}`} alt="" />
        },
        {
            title: 'Hàng động',
            dataIndex: '',
            render: (t, r) => <div>
                <EditFilled style={{ fontSize: '16px', color: '#1677ff', marginRight:'10px' }} onClick={() => {
                    navigate(`/admin/editRoom/${r.id}`);
                }}/>
                <DeleteFilled style={{ fontSize: '16px', color: '#ff4d4f' }} onClick={() => {
                    let action = removeRoomAction(r.id);
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
                let action = setAlertRoomAction(['', 0]);
                dispatch(action);
            },
        });
    }

    let getListRoomAPI = () => {
        let action = listRoomAction();
        dispatch(action);
    }

    return (
        <div style={{ padding: '15px' }}>
            <h2 >Quản lý phòng</h2>
            <Button  type="primary" style={{ marginBottom: '10px' }} onClick={() => {
                navigate('/admin/addroom');
            }}>Thêm phòng</Button>
            <Table rowKey='id' columns={columns} dataSource={arrRoom} />
        </div>
    )
}
