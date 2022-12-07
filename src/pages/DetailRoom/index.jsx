import React, { useEffect, useState } from 'react'
import { Col, Row, Select, DatePicker, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import "antd/dist/reset.css";
import { useParams } from 'react-router-dom'
import { dataIMG } from '../../components/CardRoom/dataImg'
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
import './style.scss'
import moment from 'moment/moment';


export default function DetailRoom() {
    const serviceCharge = Number(5)
    let { id } = useParams()
    const [datePicker, setDatePicker] = useState([0, 0])
    const [date, setDate] = useState(1)
    const [totalPay, setTotalPay] = useState(0)
    const [people, setPeople] = useState(0)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetailRoom(id))
    }, [])
    const { detailRoom } = useSelector(state => state.RoomReducer)
    console.log(detailRoom);
    // chọn ngày 
    const { RangePicker } = DatePicker;
    const disabledDate = (current) => {
        // set disabled ngày đã trải qua
        let customDate = moment().format("YYYY-MM-DD");
        return current && current < moment(customDate, "YYYY-MM-DD");
    };
    const onChange = (date, dateString) => {
        setDatePicker(dateString)
        //  chuyển ngày chọn sang milisecond rồi tính số ngày
        const totalMilisecond = Date.parse(`${dateString[1]}`) - Date.parse(`${dateString[0]}`)
        const totalDate = Number(totalMilisecond / 86400000)
        const totalPay = detailRoom.giaTien * totalDate
        console.log(totalPay)
        setDate(totalDate)
        setTotalPay(totalPay)
    };
    // Tổng tiền
    const allToatal = () => {
        if (totalPay === 0) {
            return detailRoom.giaTien + serviceCharge
        }
        return totalPay + serviceCharge
    }
    const onChangePeople = (value) => {
        setPeople(value)
        console.log(`selected ${value}`);
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
            <Row gutter={[32, 16]}>
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
                    <div className="ticket-pay">
                        <h6 className='title-pay'> <span>${detailRoom.giaTien}</span> đêm</h6>

                        <div className="input__choose-item">
                            <Space direction="vertical" size={12}>
                                <RangePicker disabledDate={disabledDate} onChange={onChange} />
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
                                        label: '1 Người',
                                    },
                                    {
                                        value: '2',
                                        label: '2 Người',
                                    },
                                    {
                                        value: '3',
                                        label: '3 Người',
                                    },
                                    {
                                        value: '4',
                                        label: '4 Người',
                                    },
                                    {
                                        value: '5',
                                        label: '5 Người',
                                    }
                                ]}
                            />
                        </div>
                        <button className='btn-bookingRoom'>
                            <span>Đặt Phòng</span>
                        </button>
                        <p className='text-center'>Bạn Vẫn Chưa Bị Trừ Tiền</p>
                        <div className='total__pay'>
                            <div>
                                <h6>${detailRoom.giaTien} x {date} đêm</h6>
                            </div>
                            <div>
                                {totalPay === 0
                                    ? <h6> ${detailRoom.giaTien} </h6>
                                    : <h6> ${totalPay}</h6>}
                            </div>
                        </div>
                        <div className='total__service'>
                            <div>
                                <h6>Phí Dịch Vụ</h6>
                            </div>
                            <div>
                                <h6>${serviceCharge}</h6>
                            </div>
                        </div>
                        <div className='total__pay total-end'>
                            <div>
                                <h4>Tổng Trước Thuế</h4>
                            </div>
                            <div>
                                <h6>${allToatal()}</h6>
                            </div>
                        </div>

                    </div>

                </Col>

            </Row>
        </div>
    )
}
