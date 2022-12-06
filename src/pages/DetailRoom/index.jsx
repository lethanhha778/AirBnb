import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import "antd/dist/reset.css";
import { useParams } from 'react-router-dom'
import { dataIMG } from '../../components/CardRoom/dataImg'
import { DatePicker, Space } from 'antd'
import { getDetailRoom } from '../../redux/actions/RoomAction'
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { GiNetworkBars, GiBusDoors, GiThermometerCold, GiWashingMachine } from "react-icons/gi";
import { FiShare } from "react-icons/fi";
import { FaHandHoldingHeart, FaParking } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { MdIron } from "react-icons/md";
import { BiSwim } from "react-icons/bi";
import { CgScreen } from "react-icons/cg";
import { TbToolsKitchen } from "react-icons/tb";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './style.scss'

export default function DetailRoom() {
    dayjs.extend(customParseFormat);
    let { id } = useParams()
    console.log(id);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetailRoom(id))
    }, [])
    const { detailRoom } = useSelector(state => state.RoomReducer)
    console.log(detailRoom);
    // chọn ngày
    const [dateStar, setDateStar] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const onChangeStartDay = (date, dateString) => {
        console.log('start', dateString);
        setDateStar(dateString)
    };
    const onChangeEndDay = (date, dateString) => {
        console.log(dateString);
        setDateEnd(dateString)
    };

    const renderDetailRoom = () => {
        const newRoom = { ...detailRoom, data: dataIMG[id] }
        return <div>
            <h3 className='title-detail'>{newRoom?.tenPhong}</h3>
            <div className='d-flex justify-content-between'>
                <div className='rating' >
                    <span className='rating__star'><AiFillStar />{newRoom?.data.start}<span>Đánh Giá</span></span>
                    <span className='rating__user'><FaHandHoldingHeart /><span>Chủ Nhà Siêu Thân Thiện</span></span>
                </div>
                <div className='share'>
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
            <Row gutter={[48, 16]}>
                <Col span={16} className='col__left'>
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
                    </div>


                </Col>
                <Col span={8} className='col__right'>
                    <h6>${detailRoom.giaTien} đêm</h6>
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
                </Col>

            </Row>
        </div>
    )
}
