import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { listLocationAction, removeLocationAction, setAlertLocationAction } from '../../redux/actions/LocationAction';
import { EditFilled , DeleteFilled } from '@ant-design/icons';
import { Button, Table, Modal } from 'antd';

export default function Location() {
    const navigate = useNavigate();
    let { arrLocation, arletContent } = useSelector(state => state.locationReducer);
    let dispatch = useDispatch();
    useEffect(() => {
        getListLocationAPI()
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
            title: 'Vị trí',
            dataIndex: 'tenViTri',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
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
                }} className='btn btn-info'/>
                <DeleteFilled style={{ fontSize: '16px', color: '#ff4d4f' }} onClick={() => {
                    let action = removeLocationAction(r.id);
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
                let action = setAlertLocationAction('');
                dispatch(action);
            },
        });
    }

    let getListLocationAPI = () => {
        let action = listLocationAction();
        dispatch(action);
    }
    return (
        <div style={{ padding: '15px' }}>
            <h2 >Quản lý vị trí</h2>
            <Button  type="primary" style={{ marginBottom: '10px' }} onClick={() => {
                navigate('/admin/addlocation');
            }} className="btn btn-success m-3">Thêm vị trí</Button>
            <Table rowKey='id' columns={columns} dataSource={arrLocation} />
        </div>
    )
}