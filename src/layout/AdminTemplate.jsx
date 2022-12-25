import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import { FileOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { USER_INFO } from '../util/setting';
import Dropdown from 'react-bootstrap/Dropdown';
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
        getItem('Danh sách người dùng', '/admin/users'),
        getItem('Thêm người dùng', '/admin/adduser'),
    ]),
    getItem('Quản lý vị trí', 'sub2', <FileOutlined />, [
        getItem('Danh sách vị trí', '/admin/locations'),
        getItem('Thêm vị trí', '/admin/addlocation')]),
    getItem('Quản lý phòng', 'sub3', <FileOutlined />, [
        getItem('Danh sách phòng', '/admin/rooms'),
        getItem('Thêm phòng', '/admin/addroom')]),
    getItem('Quản lý đặt phòng', 'sub4', <FileOutlined />, [
        getItem('Danh sách đặt phòng', '/admin/bookingrooms'),
        getItem('Đặt phòng', '/admin/addbookingroom')]),
    getItem('Quản lý bình luận', 'sub5', <FileOutlined />, [
        getItem('Danh sách bình luận', '/admin/comments'),
        getItem('Thêm bình luận', '/admin/addcomment')]),
];



const AdminTemplate = () => {
    let { user } = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const fixchangeMenu = (url) => {
        if (url === '/admin' || '/admin/') {
            return '/admin/users';
        }
        if (url.indexOf('edit') !== -1) {
            return `/admin/${url.split('/')[2].substr(4)}s`;
        }
        return url;
    }
    const [current, setCurrent] = useState(fixchangeMenu(useLocation().pathname));


    useEffect(() => {
        const user_data = localStorage.getItem(USER_INFO) || '{}'
        const user_json = JSON.parse(user_data)
        if (Object.keys(user_json).length === 0) {
            navigate('/auth/login');
        }
        else{
            if (user_json.role !== 'ADMIN') {
                navigate('/home');
            }
        }
        // eslint-disable-next-line
    }, []);

    const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	};

    if(user.role === 'ADMIN'){
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
                <Header style={{ textAlign: 'right' }}>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-info">
                            {user.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ lineHeight: '1.5rem', fontSize: '1.2rem' }}>
                            <Dropdown.Item onClick={() => {
                                navigate(`/admin/edituser/${user.id}`);
                                setCurrent('/admin/users');
                            }}>Cập nhập thông tin</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                handleLogout();
                                navigate('/home');
                            }}>Đăng xuất</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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
    
}

export default AdminTemplate;