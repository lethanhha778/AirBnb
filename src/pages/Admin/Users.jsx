import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listUserAction, removeUserAction, searchUserAction, setAlertUserAction } from '../../redux/actions/UserAction'
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { Form, Input, Button, Table, Modal } from 'antd';

export default function Users() {
    let { arrUser, arletContent } = useSelector(state => state.userAdminReducer);
    let dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        getListUserAPI()
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

    const searchName = (name) => {
        if(name.trim() !== ''){
            let action = searchUserAction(name);
            dispatch(action);
        }
        else{
            getListUserAPI();
        }
    }

    const validate = values => {
        searchName(values.name);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validate,
        onSubmit: values => {
            searchName(values.name);
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
        let action = listUserAction();
        dispatch(action);
    }
    return (
        <div style={{ padding: '15px' }}>
            <h2 >Quản lý người dùng</h2>
            <Button type="primary" style={{ marginBottom: '10px' }} onClick={() => {
                navigate('/admin/adduser');
            }}>Thêm người dùng</Button>
            <Form layout="horizontal" onFinish={formik.handleSubmit}>
                <Form.Item name="name" style={{ display: 'inline-block', width: '80%' }}>
                    <Input onChange={formik.handleChange} placeholder="Tìm kiếm theo tên người dùng"/>
                </Form.Item>
                <Form.Item style={{ display: 'inline-block', marginLeft:'10px'}}>
                    <Button type="default" htmlType="submit">Tìm kiếm</Button>
                </Form.Item>

            </Form>
            <Table rowKey='id' columns={columns} dataSource={arrUser} />
        </div>
    )
}
