import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Button, Table, Modal } from 'antd';
import { listRoomAction, removeRoomAction, setAlertRoomAction } from '../../redux/actions/RoomAction';

export default function Location() {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    let { pagRoom, arletContent } = useSelector(state => state.roomAdminReducer);
    let { tableLoading } = useSelector(state => state.LoadingReducer);
    let dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        getListRoomAPI();
        // eslint-disable-next-line
    }, [JSON.stringify(tableParams)]);

    useEffect(() => {
        if (arletContent[0] !== '') {
            getListRoomAPI();
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
            render: (t, r) => <img style={{ width: '150px' }} src={`${r.hinhAnh}`} alt="" />
        },
        {
            title: 'Hàng động',
            dataIndex: '',
            render: (t, r) => <div>
                <EditFilled style={{ fontSize: '16px', color: '#1677ff', marginRight: '10px' }} onClick={() => {
                    navigate(`/admin/editroom/${r.id}`);
                }} />
                <DeleteFilled style={{ fontSize: '16px', color: '#ff4d4f' }} onClick={() => {
                    let action = removeRoomAction(r.id);
                    dispatch(action);
                }} />
            </div>,
        },
    ];


    const handleTableChange = (pagination, sorter) => {
        setTableParams({
            pagination,
            ...sorter,
        });
        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            pagRoom.data = [];
        }

    };

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
        let { current, pageSize } = tableParams.pagination;
        let action = listRoomAction(current, pageSize);
        dispatch(action);
    }

    return (
        <div style={{ padding: '15px' }}>
            <h2 >Quản lý phòng</h2>
            <Button type="primary" style={{ marginBottom: '20px' }} onClick={() => {
                navigate('/admin/addroom');
            }}>Thêm phòng</Button>
            <Table rowKey='id' columns={columns} dataSource={pagRoom.data} 
            pagination={{
                current: pagRoom.pageIndex,
                pageSize: pagRoom.pageSize, 
                total: pagRoom.totalRow,
            }} 
            loading={tableLoading} onChange={handleTableChange} />
        </div>
    )
}
