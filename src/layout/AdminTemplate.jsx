import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FileOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { ACCESS_TOKEN, USER_INFO } from '../util/setting';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Quản lý người dùng', 'sub1', <UserOutlined />, [
        getItem('Người dùng', '/admin/users'),
        getItem('Thêm người dùng', '/admin/adduser'),
    ]),
    getItem('Quản lý vị trí', 'sub2', <FileOutlined />, [
        getItem('Vị trí', '/admin/locations'),
        getItem('Thêm vị trí', '/admin/addlocation')]),
    getItem('Quản lý phòng', 'sub3', <FileOutlined />, [
        getItem('Phòng', '/admin/rooms'),
        getItem('Thêm phòng', '/admin/addroom')]),
    getItem('Quản lý đặt phòng', 'sub4', <FileOutlined />, [
        getItem('Đặt phòng', '/admin/bookingrooms'),
        getItem('Đặt phòng mới', '/admin/addbookingroom')]),
    getItem('Quản lý bình luận', 'sub5', <FileOutlined />, [
        getItem('Bình luận', '/admin/comments'),
        getItem('Thêm bình luận', '/admin/addcomment')]),
];

const AdminTemplate = () => {
    let { user } = useSelector(state => state.AuthReducer);
    console.log(user);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState('/admin');

    const dropItems = [
        {
            label: (<div style={{ paddingRight: '18px' }}>{user.name}<DownOutlined style={{ position: 'absolute', top: '26px', right: '0' }} /></div>),
            key: 'SubMenu',
            children: [
                {
                    label: 'Cập nhập thông tin',
                    key: `/admin/edituser/${user.id}`,
                    style: { paddingLeft: '10px' },
                },
                {
                    label: 'Đăng xuất',
                    key: '/home',
                    style: { paddingLeft: '10px' },
                },
            ],
        },
    ];

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            navigate('/auth/login');
        }
        else if (user.role !== 'ADMIN') {
            navigate('/home');
        }
    },[user]);

    return <Fragment>
        <Layout style={{ minHeight: '100vh', }}>
            <Sider width='220px' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: '64px', textAlign: 'center', lineHeight: '64px' }}>
                    <NavLink to="/home"><img style={{ width: '102px', height: '32px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png" alt="logo" /></NavLink>
                </div>
                <Menu onClick={(link) => {
                    navigate(link.key);
                    setCurrent(link.key);
                }} theme="dark" selectedKeys={[current]} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header>
                    <Menu style={{ marginLeft: 'auto', width: 'fit-content', }} onClick={(drop) => {
                        if (drop.key === '/home') {
                            localStorage.removeItem(ACCESS_TOKEN);
                            localStorage.removeItem(USER_INFO);
                        }
                        navigate(drop.key);
                    }} theme="dark" mode="horizontal" items={dropItems} />
                </Header>
                <Content style={{ margin: '0 16px', }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center', }} >
                    Copyright by Q
                </Footer>
            </Layout>
        </Layout>
    </Fragment>
}

export default AdminTemplate;