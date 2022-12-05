import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditFilled , DeleteFilled } from '@ant-design/icons';
import { Button, Table, Modal } from 'antd';
import { history } from "../../App";
import { listRoomAction, removeRoomAction, setAlertRoomAction } from '../../redux/actions/RoomAction';

export default function Location() {
    let { arrRoom, arletContent } = useSelector(state => state.roomReducer);
    let dispatch = useDispatch();
    useEffect(() => {
        getListRoomAPI()
    }, []);

    useEffect(() => {
        if (arletContent !== '') {
            info()
        }
    }, [arletContent]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: 'Tên phòng',
            dataIndex: 'tenPhong',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
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
                    history.push(`/admin/editRoom/${r.id}`);
                }} className='btn btn-info'/>
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
                    <p>{arletContent}</p>
                </div>
            ),
            onOk() {
                let action = setAlertRoomAction('');
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
                history.push('/admin/addroom');
            }} className="btn btn-success m-3">Thêm phòng</Button>
            <Table rowKey='id' columns={columns} dataSource={arrRoom} />
        </div>
    )
}
