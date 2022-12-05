import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUserAction, removeUserAction, setAlertUserAction } from '../../redux/actions/UserAction'
import { EditFilled , DeleteFilled } from '@ant-design/icons';
import { Button, Table, Modal } from 'antd';
import { history } from "../../App";

export default function Users() {
    let { arrUser, arletContent } = useSelector(state => state.userReducer);
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
            title: 'Tên',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone'
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday'
        },
        {
            title: 'avatar',
            dataIndex: 'avatar',
            width: '10%',
            render: (t, r) => <img className='img-fluid' src={`${r.avatar}`} alt="" />
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            render: (t, r) => r.gender === true ? 'Nam' : 'Nữ'
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
        },
        {
            title: 'Hàng động',
            dataIndex: '',
            render: (t, r) => <div>
                <EditFilled style={{ fontSize: '16px', color: '#1677ff', marginRight:'10px' }} onClick={() => {
                    history.push(`/admin/edituser/${r.id}`);
                }} className='btn btn-info'/>
                <DeleteFilled style={{ fontSize: '16px', color: '#ff4d4f' }} onClick={() => {
                    let action = removeUserAction(r.id);
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
                let action = setAlertUserAction('');
                dispatch(action);
            },
        });
    }

    let getListUserAPI = () => {
        let action = listUserAction();
        dispatch(action);
    }
    return (
        <div style={{ padding: '15px' }}>
            <h2 >Quản lý người dùng</h2>
            <Button  type="primary" style={{ marginBottom: '10px' }} onClick={() => {
                history.push('/admin/adduser');
            }} className="btn btn-success m-3">Thêm người dùng</Button>
            <Table rowKey='id' columns={columns} dataSource={arrUser} />
        </div>
    )
}
