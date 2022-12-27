import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { listLocationAction, removeLocationAction, setAlertLocationAction } from '../../redux/actions/LocationAction';
import { EditFilled , DeleteFilled } from '@ant-design/icons';
import { Button, Table, Modal } from 'antd';

export default function Location() {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    
    let { pagLocation, arletContent } = useSelector(state => state.LocationReducer);
    let { tableLoading } = useSelector(state => state.LoadingReducer);
    let dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getListLocationAPI();
        // eslint-disable-next-line
    }, [JSON.stringify(tableParams)]);

    useEffect(() => {
        if (arletContent[0] !== '') {
            getListLocationAPI();
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
            title: 'Vị trí',
            dataIndex: 'tenViTri', 
        },
        {
            title: 'Tỉnh thành',
            dataIndex: 'tinhThanh'
        },
        {
            title: 'Quốc gia',
            dataIndex: 'quocGia'
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
                    navigate(`/admin/editlocation/${r.id}`);
                }}/>
                <DeleteFilled style={{ fontSize: '16px', color: '#ff4d4f' }} onClick={() => {
                    let action = removeLocationAction(r.id);
                    dispatch(action);
                }}/>
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
            pagLocation.data = [];
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
                let action = setAlertLocationAction(['', 0]);
                dispatch(action);
            },
        });
    }

    let getListLocationAPI = () => {
        let { current, pageSize } = tableParams.pagination;
        let action = listLocationAction(current, pageSize);
        dispatch(action);
    }

    return (
        <div style={{ padding: '15px' }}>
            <h2 >Quản lý vị trí</h2>
            <Button  type="primary" style={{ marginBottom: '20px' }} onClick={() => {
                navigate('/admin/addlocation');
            }}>Thêm vị trí</Button>
            <Table rowKey='id' columns={columns} dataSource={pagLocation.data} 
            pagination={{
                current: pagLocation.pageIndex,
                pageSize: pagLocation.pageSize, 
                total: pagLocation.totalRow,
            }} 
            loading={tableLoading} onChange={handleTableChange}/>
        </div>
    )
}