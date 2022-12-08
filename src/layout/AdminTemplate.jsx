import React, { useState } from 'react';
import { Fragment } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FileOutlined, UserOutlined, } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
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
    getItem('Quản lý tài khoản', 'sub1', <UserOutlined />, [
        getItem('Tài khoản', '/admin/users'),
        getItem('Thêm tài khoản', '/admin/adduser'),
    ]),
    getItem('Quản lý vị trí', 'sub2', <FileOutlined />, [
        getItem('Vị trí', '/admin/locations'),
        getItem('Thêm mới', '/admin/addlocation')]),
    getItem('Quản lý phòng', 'sub3', <FileOutlined />, [
        getItem('Phòng', '/admin/rooms'),
        getItem('Thêm mới', '/admin/addroom')]),
    getItem('Quản lý đặt phòng', 'sub4', <FileOutlined />, [
        getItem('Đặt phòng', '/admin/bookingrooms'),
        getItem('Thêm mới', '/admin/addbookingroom')]),
];

const AdminTemplate = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    return <Fragment>
        <Layout style={{ minHeight: '100vh', }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ margin: '16px', }}><NavLink to="/home"><span style={{ padding: '15px' }}>Trang chủ</span> </NavLink></div>
                <Menu onClick={(link) => {
                    navigate(link.key);
                }} theme="dark" defaultSelectedKeys={['/admin']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header>

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