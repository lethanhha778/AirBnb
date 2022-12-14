import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Select, DatePicker, Space, Button } from "antd";
import {
	AiOutlineSearch,
	AiOutlineMenu,
	AiOutlineHeart,
	AiOutlineUserAdd,
	AiTwotoneHome,
} from "react-icons/ai";
import { HiUserCircle, HiOutlineUserCircle } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { FaUserEdit, FaUserCircle, } from "react-icons/fa";
import {  MdManageAccounts } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListLocation } from "../../redux/actions/LocationAction";
import { openCustomNotificationWithIcon } from "../../util/func";
import { ACCESS_TOKEN, USER_INFO } from "../../util/setting";
import "./style.scss";

export default function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [openSelect, setOpenSelect] = useState(false);
	const [openDrop, setOpenDrop] = useState(false);
	const [bg, setBg] = useState(true);

	useEffect(() => {
		dispatch(getListLocation());
	}, [dispatch]);

	const { arrayLocation } = useSelector((state) => state.LocationReducer);
	const [idViTri, setIdViTri] = useState(0);

	const onChange = (value) => {
		setIdViTri(value);
	};
	const onSearch = (value) => {
		setIdViTri(value);
	};

	const { Option } = Select;
	const closeNav = () => {
		if (window.scrollY === 0) {
			setBg(true);
		}
		if (window.scrollY >= 100) {
			setOpenSelect(false);
			setOpenDrop(false);
			setBg(false);
		}
	};
	window.addEventListener("scroll", closeNav);
	const btnSearch = () => {
		if (idViTri !== 0) {
			navigate(`/SearchPage/${idViTri}`);
		} else {
			openCustomNotificationWithIcon(
				"warning",
				"Search Fail",
				"Please select the location to search!"
			);
		}
	};
	const renderOption = () => {
		return arrayLocation?.map((item, index) => {
			return (
				<Option key={index} value={item.id}>
					{item.tenViTri}
				</Option>
			);
		});
	};

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	};

	return (
		<>
			{/* Navbar Pc */}
			<Navbar
				fixed="top"
				className={`d-none d-md-flex header-airbnb 
        ${bg ? "bg-one" : "bg-two"} `}
			>
				<Container>
					<Navbar.Brand
						href="/"
						className="d-none d-md-block">
						<img
							className="logo-airbnb"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
							alt=""
						/>
					</Navbar.Brand>
					<Navbar className="px-3 px-md-0 justify-content-end">
						{openSelect ? (
							<div className="header-location">
								<ul className="menu-select">
									<li
										className="menu-active"
										onClick={() => {
											setOpenSelect(!openSelect);
										}}
									>
										N??i ???
									</li>
									<li>Tr???i Nghi???m</li>
									<li>Tr???i Nghi???m Tr???c Tuy???n</li>
								</ul>
								<div className="select-location">
									<div className="input__choose-item">
										<Select
											showSearch
											placeholder="?????a ??i???m ?????n"
											optionFilterProp="children"
											onChange={onChange}
											onSearch={onSearch}
											filterOption={(input, option) =>
												option.children
													.toLowerCase()
													.includes(input.toLowerCase())
											}
										>
											{renderOption()}
										</Select>
									</div>
									<div className="input__choose-item">
										<Space direction="vertical" size={12}>
											<DatePicker
												placeholder="Ng??y B???t ?????u"
											/>
										</Space>
										<Space direction="vertical" size={12}>
											<DatePicker
												placeholder="Ng??y K???t Th??c"
											/>
										</Space>
									</div>
									<div className="input__choose-item">
										<Select
											showSearch
											placeholder="S??? Ng?????i"
											optionFilterProp="children"
											filterOption={(input, option) =>
												(option?.label ?? "")
													.toLowerCase()
													.includes(input.toLowerCase())
											}
											options={[
												{
													value: "1",
													label: "1",
												},
												{
													value: "2",
													label: "2",
												},
												{
													value: "3",
													label: "3",
												},
												{
													value: "4",
													label: "4",
												},
												{
													value: "5",
													label: "5",
												},
											]}
										/>
									</div>
									<Button
										onClick={() => {
											btnSearch();
										}}
										className="btn__select-search"
										shape="round"
										icon={<AiOutlineSearch fontSize={20} />}
										size={"middle "}
									>
										Search
									</Button>
								</div>
							</div>
						) : (
							<div
								onClick={() => { setOpenSelect(!openSelect); }}
								className="btn-search"
							>
								<span>?????a ??i???m B???t K???</span> |<span>Tu???n B???t K???</span> |
								<span>Th??m Kh??ch</span>
								<AiOutlineSearch className="icon__search" />
							</div>
						)}
					</Navbar>
					<Navbar className="px-3 px-md-0 justify-content-end d-flex align-items-center position-relative">
						<button
							onClick={() => {
								navigate("hostHome");
							}}
							className="btn-header btn__no-boder d-none d-lg-block "
						>
							Cho Thu?? Ch??? ??? Qua AirBnb
						</button>
						<button
							onClick={() => {
								setOpenDrop(!openDrop);
							}}
							className="btn-user"
						>
							<AiOutlineMenu className="mx-1" />
							<HiUserCircle className="mx-1 user" />
						</button>
						{openDrop ? (
							<div className="dropdownUser__menu ">
								<ul>
									{localStorage.getItem(USER_INFO) &&
										localStorage.getItem(ACCESS_TOKEN) ? (
										<>
											<NavLink
												to="/profile"
												className="dropdownUser__item user"
											>
												<FaUserEdit />{" "}
												{JSON.parse(
													localStorage.getItem(USER_INFO)
												).name.substr(0, 20)}
											</NavLink>
											{JSON.parse(
													localStorage.getItem(USER_INFO)
												).role === "ADMIN" ? (<NavLink
												to="/admin"
												className="dropdownUser__item admin"
											>
												<MdManageAccounts />{" "} Qu???n l??
											</NavLink>):(<></>)}
											
											<NavLink
												onClick={() => handleLogout()}
												className="dropdownUser__item underlined"
											>
												{" "}
												<ImExit /> ????ng Xu???t
											</NavLink>
										</>
									) : (
										<>
											<NavLink to="/auth/login" className="dropdownUser__item">
												????ng Nh???p
											</NavLink>
											<NavLink
												to="/auth/register"
												className="dropdownUser__item underlined"
											>
												????ng K??
											</NavLink>
										</>
									)}
									<li className="dropdownUser__item ">Cho Thu?? Ch??? ???</li>
									<li className="dropdownUser__item ">T??? Ch???c Tr???i Nghi???m</li>
									<li className="dropdownUser__item ">Tr??? Gi??p</li>
								</ul>
							</div>
						) : (
							" "
						)}
					</Navbar>
				</Container>
			</Navbar>
			{/*Navbar mobile */}
			<Navbar fixed="top" className="d-md-none">
				{openSelect ? (
					<div className="header__mobile-location">
						<ul className="menu__mobile-select">
							<li
								className="menu-active"
								onClick={() => {
									setOpenSelect(!openSelect);
								}}
							>
								N??i ???
							</li>
							<li>Tr???i Nghi???m</li>
							<li>Tr???i Nghi???m Tr???c Tuy???n</li>
						</ul>
						<div className="select__mobile-location">
							<div className="input__mobile-choose-item">
								<Select
									showSearch
									placeholder="?????a ??i???m ?????n"
									optionFilterProp="children"
									onChange={onChange}
									onSearch={onSearch}
									filterOption={(input, option) =>
										(option?.label ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
								>
									{renderOption()}
								</Select>
							</div>
							<div className="input__mobile-choose-item">
								<Space direction="vertical" size={12}>
									<DatePicker
										placeholder="Ng??y B???t ?????u"
									/>
								</Space>
								<Space direction="vertical" size={12}>
									<DatePicker
										placeholder="Ng??y K???t Th??c"
									/>
								</Space>
							</div>
							<div className="input__mobile-choose-item">
								<Select
									showSearch
									placeholder="S??? Ng?????i"
									optionFilterProp="children"
									filterOption={(input, option) =>
										(option?.label ?? "")
											.toLowerCase()
											.includes(input.toLowerCase())
									}
									options={[
										{
											value: "1",
											label: "1",
										},
										{
											value: "2",
											label: "2",
										},
										{
											value: "3",
											label: "3",
										},
										{
											value: "4",
											label: "4",
										},
										{
											value: "5",
											label: "5",
										},
									]}
								/>
							</div>
							<Button
								onClick={() => {
									btnSearch();
								}}
								className="btn__mobile-search"
								shape="round"
								icon={<AiOutlineSearch fontSize={20} />}
								size={"middle "}
							>
								Search
							</Button>
						</div>
					</div>
				) : (
					<div
						onClick={() => {
							setOpenSelect(!openSelect);
						}}
						className=" header__mobile-top "
					>
						<AiOutlineSearch />
						<span>B???n Mu???n ??i ????u?</span>
					</div>
				)}
			</Navbar>
			<Navbar fixed="bottom" className="header__mobile-bottom d-flex d-md-none">
				<ul className="menu__bottom">
					<NavLink to="/" className="menu__bottom-item">
						<AiTwotoneHome style={{ color: "#FF385C" }} />
						Home
					</NavLink>
					<li className="menu__bottom-item">
						<AiOutlineHeart />
						Y??u Th??ch
					</li>
					{localStorage.getItem(USER_INFO) &&
						localStorage.getItem(ACCESS_TOKEN) ? (
						<>
							<NavLink
								to="/profile"
								className="menu__bottom-item user">
								<FaUserCircle />{" "}
								{JSON.parse(localStorage.getItem(USER_INFO)).name.substr(0, 5)}
							</NavLink>
							<NavLink onClick={() => handleLogout()}
								className="menu__bottom-item underlined">
								<ImExit />{" "}
								????ng Xu???t
							</NavLink>
						</>
					) : (
						<>
							<NavLink to="/auth/login" className="menu__bottom-item">
								<HiOutlineUserCircle />
								????ng Nh???p
							</NavLink>
							<NavLink to="/auth/register" className="menu__bottom-item">
								<AiOutlineUserAdd />
								????ng K??
							</NavLink>
						</>
					)}
				</ul>
			</Navbar>
		</>
	);
}
