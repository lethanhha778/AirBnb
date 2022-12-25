import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listUserPageAction, removeUserAction, searchUserAction, setAlertUserAction } from '../../redux/actions/UserAction'
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Form, Input, Button, Table, Modal } from 'antd';
import './style.css';

export default function Users() {
    const [searchName, setSearchName] = useState('');
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    let { pagUser, arletContent } = useSelector(state => state.userAdminReducer);
    let { tableLoading } = useSelector(state => state.LoadingReducer);
    let dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getListUserAPI();
        // eslint-disable-next-line
    }, [JSON.stringify(tableParams), searchName]);

    useEffect(() => {
        if (arletContent[0] !== '') {
            getListUserAPI();
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
            title: 'Tên',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday'
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
                <EditFilled style={{ fontSize: '16px', color: '#1677ff', marginRight: '10px' }} onClick={() => {
                    navigate(`/admin/edituser/${r.id}`);
                }} />
                <DeleteFilled style={{ fontSize: '16px', color: '#ff4d4f' }} onClick={() => {
                    let action = removeUserAction(r.id);
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
            pagUser.data = [];
        }
    };


    const validate = values => {
        setSearchName(values.name.trim());
    };

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validate,
        onSubmit: values => {
            setSearchName(values.name.trim());
        },
    });

    let info = () => {
        Modal.info({
            title: 'Thông báo',
            content: (
                <div>
                    <p>{arletContent[0]}</p>
                </div>
            ),
            onOk() {
                let action = setAlertUserAction(['', 0]);
                dispatch(action);
            },
        });
    }

    let getListUserAPI = () => {
        let { current, pageSize } = tableParams.pagination;
        if (searchName !== '') {
            let action = searchUserAction(searchName, tableParams.pagination);
            dispatch(action);
        }
        else {
            let action = listUserPageAction(current, pageSize);
            dispatch(action);
        }
    }

    return (
        <div style={{ padding: '15px' }}>
            <h2 >Quản lý người dùng</h2>
            <Button type="primary" style={{ marginBottom: '20px' }} onClick={() => {
                navigate('/admin/adduser');
            }}>Thêm người dùng</Button>
            <Form layout="horizontal" onFinish={formik.handleSubmit}>
                <Form.Item name="name" style={{ display: 'inline-block', width: '80%' }}>
                    <Input onChange={formik.handleChange} placeholder="Tìm kiếm theo tên người dùng" />
                </Form.Item>
                <Form.Item style={{ display: 'inline-block', marginLeft: '10px' }}>
                    <Button type="default" htmlType="submit">Tìm kiếm</Button>
                </Form.Item>
            </Form>
            <Table rowKey='id' columns={columns} dataSource={pagUser.data} 
            pagination={{
                current: pagUser.pageIndex,
                pageSize: pagUser.pageSize, 
                total: pagUser.totalRow
            }} 
            loading={tableLoading} 
            onChange={handleTableChange} />
        </div>
    )
}
