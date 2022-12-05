import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditFilled , DeleteFilled } from '@ant-design/icons';
import { Button, Table, Modal } from 'antd';
import { history } from "../../App";
import { listBookingAction, removeBookingAction, setAlertBookingAction } from '../../redux/actions/BookingRoomAction';

export default function BookingRoom() {
    let { arrBooking, arletContent } = useSelector(state => state.bookingReducer);
    let dispatch = useDispatch();
    useEffect(() => {
        getListUserAPI()
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
            title: 'Mã phòng',
            dataIndex: 'maPhong',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'Ngày đến',
            dataIndex: 'ngayDen'
        },
        {
            title: 'Ngày đi',
            dataIndex: 'ngayDi'
        },
        {
            title: 'Số lượng khách',
            dataIndex: 'soLuongKhach'
        },
        {
            title: 'Mã người dùng',
            dataIndex: 'maNguoiDung',
        },
        {
            title: 'Hàng động',
            dataIndex: '',
            render: (t, r) => <div>
                <EditFilled style={{ fontSize: '16px', color: '#1677ff', marginRight:'10px' }} onClick={() => {
                    history.push(`/admin/editbookingroom/${r.id}`);
                }} className='btn btn-info'/>
                <DeleteFilled style={{ fontSize: '16px', color: '#ff4d4f' }} onClick={() => {
                    let action = removeBookingAction(r.id);
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
                let action = setAlertBookingAction('');
                dispatch(action);
            },
        });
    }

    let getListUserAPI = () => {
        let action = listBookingAction();
        dispatch(action);
    }
    return (
        <div style={{ padding: '15px' }}>
            <h2 >Quản lý đặt phòng</h2>
            <Button  type="primary" style={{ marginBottom: '10px' }} onClick={() => {
                history.push('/admin/addbookingroom');
            }} className="btn btn-success m-3">Đặt phòng</Button>
            <Table rowKey='id' columns={columns} dataSource={arrBooking} />
        </div>
    )
}
