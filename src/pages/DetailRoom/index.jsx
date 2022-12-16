import React, { useEffect, useMemo, useState } from 'react'
import { Col, Row, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import "antd/dist/reset.css";
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailRoom } from '../../redux/actions/RoomAction'
import { AiOutlineHeart } from "react-icons/ai";
import { GiNetworkBars, GiBusDoors, GiThermometerCold, GiWashingMachine } from "react-icons/gi";
import { FiShare } from "react-icons/fi";
import { FaHandHoldingHeart, FaParking } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { MdIron } from "react-icons/md";
import { BiSwim } from "react-icons/bi";
import { CgScreen } from "react-icons/cg";
import { TbToolsKitchen } from "react-icons/tb";
import { dataIMG } from '../../components/CardRoom/dataImg';
import CommnetUser from '../../components/CommentUser';
import { getComment } from '../../redux/actions/CommentAction';
import CardBooking from './CardBooking';
import './style.scss'
import { HIDEN_MODAL } from '../../redux/type/BookingRoomType';

export default function DetailRoom() {
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    let { id } = useParams()
    const navigation = useNavigate()
    console.log(id);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetailRoom(id))
    }, [])
    useEffect(() => {
        const action = getComment()
        dispatch(action)
    }, [])
    const { arrComment } = useSelector(state => state.CommentReducer)
    const { detailRoom } = useSelector(state => state.RoomReducer)
    const { modal, infoBookingRoom } = useSelector(state => state.BookingReducer)

    let commentMemo = useMemo(() => arrComment, [arrComment])

    // gọi action check role là gì để showw modal 
    const isModalOpen = modal
    const handleOk = () => {
        dispatch({ type: HIDEN_MODAL })
        navigation('/home')

    };
    const handleCancel = () => {
        dispatch({ type: HIDEN_MODAL })
    };


    const renderDetailRoom = () => {
        let newRoom = {}
        if (detailRoom?.id < 30) {
            newRoom = { ...detailRoom, data: dataIMG[id - 1] }
        } else {
            newRoom = {
                ...detailRoom,
                data: {
                    img1: 'https://a0.muscache.com/im/pictures/d682f7bf-caa4-4433-9038-c5f81a01845b.jpg?im_w=1200',
                    img2: 'https://a0.muscache.com/im/pictures/610236d1-a9e3-40cf-86a6-65616e8e6b80.jpg?im_w=720',
                    img3: 'https://a0.muscache.com/im/pictures/113bd9ea-b92c-4ab1-81cd-13825260e442.jpg?im_w=720',
                    img4: 'https://a0.muscache.com/im/pictures/8a704e59-1657-4c9f-b167-ceffc5f87d1d.jpg?im_w=720',
                    img5: 'https://a0.muscache.com/im/pictures/0f5b258b-722a-4f50-b90a-fc43f972b476.jpg?im_w=720',
                    start: "4,8",
                }
            }
        }

        return <div className='room-item'>
            <h3 className='title-detail'>{newRoom?.tenPhong}</h3>
            <div className='d-flex justify-content-between flex-column flex-md-row'>
                <div className='rating flex-column flex-md-row' >
                    {/* <span className='rating__star'><AiFillStar />{newRoom?.data.start}<span>Đánh Giá</span></span> */}
                    <span className='rating__user'><FaHandHoldingHeart /><span>Chủ Nhà Siêu Thân Thiện</span></span>
                </div>
                <div className='share flex-column flex-md-row'>
                    <span className='share_item1'><FiShare /><span>Chia Sẻ</span> </span>
                    <span className='share_item2'><AiOutlineHeart /><span>Lưu</span> </span>
                </div>
            </div>
            <div className="grid-container">
                <div className='item1'>
                    <img src={newRoom?.data.img1} alt="" />
                </div>
                <div className='item2 item'>
                    <img src={newRoom?.data.img2} alt="" />
                </div>
                <div className='item3 item'>
                    <img src={newRoom?.data.img3} alt="" />
                </div>
                <div className='item4 item'>
                    <img src={newRoom?.data.img4} alt="" />
                </div>
                <div className='item5 item'>
                    <img src={newRoom?.data.img5} alt="" />
                    <span className='show-img'><BsFillGrid3X3GapFill />Hiển Thị Tất Cả Ảnh</span>
                </div>
            </div>
        </div>
    }

    return (
        <div className='container-detail'>
            {renderDetailRoom()}
            <Row gutter={[32, 16]}>
                {/* nên đưa col này thành cpn để tránh render lại */}
                <Col xs={24} md={12} lg={14} xl={16} className='col__left' >
                    <Row>
                        <Col span={22} className='col__left-1'>
                            <h4> Toàn bộ căn hộ condo. Chủ Nhà Phong</h4>
                            <span className='content'>{detailRoom.khach} Khách</span> -
                            <span className='content'>{detailRoom.phongNgu} Phòng ngủ</span> -
                            <span className='content'>{detailRoom.giuong} Giường</span> -
                            <span className='content'>{detailRoom.phongTam} Phòng tắm</span>

                        </Col>
                        <Col span={2} className='col__left-2'>
                            <img src="https://blog.logomyway.com/wp-content/uploads/2020/03/arbnb-logo.jpg" alt="" />
                        </Col>
                    </Row>
                    <div className='facilities'>
                        <div className='facilities__item'>
                            <GiNetworkBars />
                            <div className='facilities__item--content'>
                                <span>Không gian riêng để làm việc</span>
                                <span>Một khu vực chung có Wi-fi, phù hợp để làm việc.</span>
                            </div>
                        </div>
                        <div className='facilities__item'>
                            <GiBusDoors />
                            <div className='facilities__item--content'>
                                <span>Tự nhận phòng</span>
                                <span>Bạn có thể gặp nhân viên trực cửa để nhận phòng.</span>
                            </div>
                        </div>
                        <div className='facilities__item'>
                            <BiSwim />
                            <div className='facilities__item--content'>
                                <span>Lặn ngụp</span>
                                <span>Đây là một trong số ít chỗ ở có bể bơi tại khu vực này.</span>
                            </div>
                        </div>
                    </div>
                    <div className='aircover'>
                        <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="" />
                        <p>Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ nhà hủy, thông tin nhà/phòng cho thuê không chính xác và những vấn đề khác như sự cố trong quá trình nhận phòng.</p>
                        <a href="https://www.airbnb.com.vn/help?audience=guest">Tìm Hiểu Thêm</a>
                    </div>
                    <div className='room-describe'>
                        <span>{detailRoom.moTa}</span>
                    </div>
                    <div className='icon-room'>
                        <h3>Nơi này có những gì cho bạn</h3>
                        <Row>
                            <Col span={8}>
                                {detailRoom.banLa ? <div className='icon__room-item'>
                                    <MdIron /> Bàn Là
                                </div> : ''}
                                {detailRoom.bep ? <div className='icon__room-item'>
                                    <TbToolsKitchen /> Bếp
                                </div> : ''}
                                {detailRoom.dieuHoa ? <div className='icon__room-item'>
                                    <GiThermometerCold /> Điều Hòa
                                </div> : ''}
                                {detailRoom.doXe ? <div className='icon__room-item'>
                                    <FaParking /> Đỗ Xe
                                </div> : ''}
                                {detailRoom.wifi ? <div className='icon__room-item'>
                                    <GiNetworkBars /> Wifi
                                </div> : ''}
                            </Col>
                            <Col span={8}>
                                {detailRoom.doXe ? <div className='icon__room-item'>
                                    <BiSwim /> Hồ Bơi
                                </div> : ''}
                                {detailRoom.doXe ? <div className='icon__room-item'>
                                    <GiWashingMachine /> Máy Giặt
                                </div> : ''}
                                {detailRoom.doXe ? <div className='icon__room-item'>
                                    <CgScreen /> Tivi
                                </div> : ''}
                            </Col>
                            <Col span={8}></Col>
                        </Row>
                        <CommnetUser maPhong={id} arr={commentMemo} />
                    </div>
                </Col>
                <Col xs={24} md={12} lg={10} xl={8} className='col__right'>
                    <CardBooking data={detailRoom} id={id} />
                </Col>
            </Row>
            <Modal title="Đặt Phòng Thành Công" okText="Về Trang Chủ" open={isModalOpen} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }}>
                <h6>Ngày Nhận Phòng: {infoBookingRoom?.ngayDen}</h6>
                <h6>Ngày Trả Phòng: {infoBookingRoom?.ngayDi}</h6>
                <h6>Số Người: {infoBookingRoom?.soLuongKhach}</h6>
            </Modal>

        </div>
    )
}
