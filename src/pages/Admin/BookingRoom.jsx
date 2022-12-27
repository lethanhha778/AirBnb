import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { EditFilled , DeleteFilled } from '@ant-design/icons';
import { Button, Table, Modal } from 'antd';
import { listBookingAction, removeBookingAction, setAlertBookingAction } from '../../redux/actions/BookingRoomAction';

export default function BookingRoom() {
    let { arrBooking, arletContent } = useSelector(state => state.BookingReducer);
    let { tableLoading } = useSelector(state => state.LoadingReducer);
    let dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        getListBookingAPI();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (arletContent[0] !== '') {
            info();
        }
        // eslint-disable-next-line
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
                    navigate(`/admin/editbookingroom/${r.id}`);
                }}/>
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
                    <p>{arletContent[0]}</p>
                </div>
            ),
            onOk() {
                let action = setAlertBookingAction(['', 0]);
                dispatch(action);
            },
        });
    }

    let getListBookingAPI = () => {
        let action = listBookingAction();
        dispatch(action);
    }
    return (
        <div style={{ padding: '15px' }}>
            <h2 >Quản lý đặt phòng</h2>
            <Button  type="primary" style={{ marginBottom: '20px' }} onClick={() => {
                navigate('/admin/addbookingroom');
            }}>Đặt phòng</Button>
            <Table rowKey='id' columns={columns} dataSource={arrBooking} loading={tableLoading}/>
        </div>
    )
}
