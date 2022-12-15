import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Select, DatePicker, Space, Button } from 'antd'
import { AiOutlineSearch, AiOutlineMenu, AiOutlineHeart, AiOutlineUserAdd, AiTwotoneHome } from "react-icons/ai";
import { HiUserCircle, HiOutlineUserCircle } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { FaUserEdit, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListLocation } from "../../redux/actions/LocationAction";
import { openCustomNotificationWithIcon } from "../../util/func";
import { DATA_SEARCH } from "../../redux/type/BookingRoomType";
import "./style.scss";

export default function Header() {
    const [openSelect, setOpenSelect] = useState(false)
    const [openDrop, setOpenDrop] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getListLocation());
    }, []);
    const { arrayLocation } = useSelector(state => state.LocationReducer)
    const [idViTri, setIdViTri] = useState(0);
    const [dateStar, setDateStar] = useState('')
    const [dateEnd, setDateEnd] = useState('')

    const [people, setPeople] = useState(0)
    const [bg, setBg] = useState(true);
    // check user login hay chưa
    const [userLogin, setUserLogin] = useState(true)
    const onChange = (value) => {
        setIdViTri(value)
        console.log(`valueChange ${value}`);
    };
    const onSearch = (value) => {
        setIdViTri(value)
        console.log('search:', value);
    };
    const onChangePeople = (value) => {
        setPeople(value)
        console.log(`selected ${value}`);
    };

    const onChangeStartDay = (date, dateString) => {
        setDateStar(dateString)
    };
    const onChangeEndDay = (date, dateString) => {
        setDateEnd(dateString)
    };
    const { Option } = Select;
    const closeNav = () => {
        if (window.scrollY === 0) {
            setBg(true);
        }
        if (window.scrollY >= 100) {
            setOpenSelect(false);
            setOpenDrop(false)
            setBg(false);
        }
    };
    window.addEventListener('scroll', closeNav);
    const btnSearch = () => {
        if (idViTri !== 0) {
            // const action = {
            //     type: DATA_SEARCH,
            //     dataSearch: {
            //         location: idViTri,
            //         dateStart: dateStar,
            //         dateEnd: dateEnd,
            //         people: people
            //     }
            // }
            // dispatch(action)
            navigate(`/roomList/${idViTri}`);
        }
        else {
            openCustomNotificationWithIcon(
                "error",
                "Search Fail",
                "Please select the location to search!"
            );
        }
    }
    const renderOption = () => {
        return arrayLocation?.map((item, index) => {
            return (
                <Option key={index} value={item.id}>
                    {item.tenViTri}
                </Option>
            );
        });
    };

    return (
        <>
            {/* Navbar Pc */}
            <Navbar fixed="top" className={`d-none d-md-flex header-airbnb ${bg ? 'bg-transparent' : 'bg-white'} `} >
                <Container >
                    <Navbar.Brand href="/" className="d-none d-md-block" >
                        <img className='logo-airbnb' src=
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png' alt="" />
                    </Navbar.Brand>
                    <Navbar className='px-3 px-md-0 justify-content-end'>
                        {openSelect ?
                            <div className="header-location" >
                                <ul className="menu-select">
                                    <li className="menu-active" onClick={() => { setOpenSelect(!openSelect) }}>Nơi Ở</li>
                                    <li>Trải Nghiệm</li>
                                    <li>Trải Nghiệm Trực Tuyến</li>
                                </ul>
                                <div className="select-location">
                                    <div className="input__choose-item">
                                        <Select
                                            showSearch
                                            placeholder="Địa Điểm Đến"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().includes(input.toLowerCase())
                                            }
                                        >
                                            {renderOption()}
                                        </Select>
                                    </div>
                                    <div className="input__choose-item">
                                        <Space direction="vertical" size={12}>
                                            <DatePicker
                                                placeholder="Ngày Bắt Đầu"
                                                onChange={onChangeStartDay} />

                                        </Space>
                                        <Space direction="vertical" size={12}>
                                            <DatePicker
                                                placeholder="Ngày Kết Thúc"
                                                onChange={onChangeEndDay} />
                                        </Space>

                                    </div>
                                    <div className="input__choose-item">
                                        <Select
                                            showSearch
                                            placeholder="Số Người"
                                            optionFilterProp="children"
                                            onChange={onChangePeople}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={[
                                                {
                                                    value: '1',
                                                    label: '1',
                                                },
                                                {
                                                    value: '2',
                                                    label: '2',
                                                },
                                                {
                                                    value: '3',
                                                    label: '3',
                                                },
                                                {
                                                    value: '4',
                                                    label: '4',
                                                },
                                                {
                                                    value: '5',
                                                    label: '5',
                                                }
                                            ]}
                                        />
                                    </div>
                                    <Button onClick={() => { btnSearch() }}
                                        className="btn__select-search" shape="round"
                                        icon={<AiOutlineSearch fontSize={20} />} size={'middle '}>
                                        Search
                                    </Button>
                                </div>
                            </div>
                            : <div onClick={() => { setOpenSelect(!openSelect) }}
                                className="btn-search">
                                <span>Địa Điểm Bất Kỳ</span> |
                                <span>Tuần Bất Kỳ</span> |
                                <span>Thêm Khách</span>
                                <AiOutlineSearch className="icon__search" />
                            </div>
                        }
                    </Navbar>
                    <Navbar className='px-3 px-md-0 justify-content-end  d-flex align-items-center position-relative'>
                        <button className="btn-header btn__no-boder d-none d-lg-block ">Cho Thuê Chỗ Ở Qua AirBnb</button>
                        <button onClick={() => { setOpenDrop(!openDrop) }} className="d-flex justify-content-between btn-user">
                            <AiOutlineMenu className="mx-1" /><HiUserCircle className="mx-1 user" />
                        </button>
                        {openDrop ?
                            <div className="dropdownUser__menu ">
                                {userLogin ? <ul>
                                    <NavLink className="dropdownUser__item "><FaUserEdit />  User</NavLink>
                                    <NavLink className="dropdownUser__item"> <ImExit /> Đăng Xuất</NavLink>
                                </ul> : <ul>
                                    <NavLink to="/auth/login" className="dropdownUser__item" >Đăng Nhập</NavLink>
                                    <NavLink to="/auth/register" className="dropdownUser__item fw-bold">Đăng Ký</NavLink>
                                </ul>}
                            </div>
                            : " "
                        }
                    </Navbar>
                </Container>
            </Navbar >
            {/*Navbar mobile */}
            <Navbar fixed="top" className="d-md-none">

                {openSelect ?
                    <div className="header__mobile-location" >
                        <ul className="menu__mobile-select">
                            <li className="menu-active" onClick={() => { setOpenSelect(!openSelect) }}>Nơi Ở</li>
                            <li>Trải Nghiệm</li>
                            <li>Trải Nghiệm Trực Tuyến</li>
                        </ul>
                        <div className="select__mobile-location">
                            <div className="input__mobile-choose-item">
                                <Select
                                    showSearch
                                    placeholder="Địa Điểm Đến"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {renderOption()}
                                </Select>
                            </div>
                            <div className="input__mobile-choose-item">
                                <Space direction="vertical" size={12}>
                                    <DatePicker
                                        placeholder="Ngày Bắt Đầu"
                                        onChange={onChangeStartDay} />
                                </Space>
                                <Space direction="vertical" size={12}>
                                    <DatePicker
                                        placeholder="Ngày Kết Thúc"
                                        onChange={onChangeEndDay} />

                                </Space>
                            </div>
                            <div className="input__mobile-choose-item">
                                <Select
                                    showSearch
                                    placeholder="Số Người"
                                    optionFilterProp="children"
                                    onChange={onChangePeople}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: '1',
                                            label: '1',
                                        },
                                        {
                                            value: '2',
                                            label: '2',
                                        },
                                        {
                                            value: '3',
                                            label: '3',
                                        },
                                        {
                                            value: '4',
                                            label: '4',
                                        },
                                        {
                                            value: '5',
                                            label: '5',
                                        }
                                    ]}
                                />
                            </div>
                            <Button onClick={() => { btnSearch() }}
                                className="btn__mobile-search" shape="round"
                                icon={<AiOutlineSearch fontSize={20} />} size={'middle '}>
                                Search
                            </Button>
                        </div>
                    </div>
                    : <div onClick={() => { setOpenSelect(!openSelect) }}
                        className=" header__mobile-top ">
                        <AiOutlineSearch />
                        <span>Bạn Muốn Đi Đâu?</span>
                    </div>
                }
            </Navbar>
            <Navbar fixed="bottom" className="header__mobile-bottom d-flex d-md-none">
                <ul className="menu__bottom">
                    <NavLink to="/" className="menu__bottom-item"><AiTwotoneHome style={{ color: '#FF385C' }} />Home</NavLink>
                    <li className="menu__bottom-item"><AiOutlineHeart />Yêu Thích</li>
                    {userLogin
                        ? <>
                            <NavLink className="menu__bottom-item"><FaUserCircle />UserName</NavLink>
                            <NavLink className="menu__bottom-item"><ImExit />Đăng Xuất</NavLink>
                        </>
                        : <>
                            <NavLink to="/auth/login" className="menu__bottom-item"><HiOutlineUserCircle />Đăng Nhập</NavLink>
                            <NavLink to="/auth/register" className="menu__bottom-item"><AiOutlineUserAdd />Đăng Ký</NavLink>
                        </>
                    }
                </ul>
            </Navbar>
        </>
    )
}
