import React, { useEffect } from 'react'
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoom } from '../../redux/actions/RoomAction';
import { useNavigate, useParams } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { dataIMG } from '../../components/CardRoom/dataImg';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './style.scss'

export default function RoomList() {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    let { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRoom(id))
    }, [dispatch, id])
    const navigate = useNavigate()
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    let newArr = []
    const { arrRoom } = useSelector(state => state.RoomReducer)
    for (let index = 0; index < arrRoom.length; index++) {
        if (arrRoom[index].id < 20) {
            newArr.push(arrRoom[index])
        }
    }
    document.title = "Danh Sách Phòng";

    const defaultProps = {
        center: {
            lat: 21.1010564,
            lng: 105.5164893
        },
        zoom: 12
    };
    const renderRoomItem = () => {
        let room = newArr?.map((item, index) => {
            return { ...item, data: dataIMG[item.id - 1] };
        });
        return room?.slice(0, 16).map((item, index) => {
            return <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} key={index} data-aos="fade-in" data-aos-duration="2000">
                <Swiper
                    loop={true}
                    cssMode={true}
                    navigation={true}
                    mousewheel={true}
                    keyboard={true}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                >
                    <SwiperSlide style={{ width: '300px' }}>
                        <img
                            src={`${item.data?.img1}`}
                            alt=""
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={`${item.data?.img2}`}
                            alt=""
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={`${item.data?.img3}`}
                            alt=""
                        />
                    </SwiperSlide>
                    <SwiperSlide >
                        <img
                            src={`${item.data?.img4}`}
                            alt=""
                        />
                    </SwiperSlide>
                </Swiper>
                <div className="room__item-describe">
                    <h5 onClick={() => { navigate(`/detailRoom/${item.id}`) }}>{item.tenPhong}</h5>
                    <div className='d-flex justify-content-between'>
                        <p>{item.giuong} giường</p>
                        <p>Số người ở: {item.khach} người</p>
                    </div>
                    <span className='price-room'> {item.giaTien} $</span> <span> / đêm</span>
                </div>
            </Col >
        })
    }

    return (
        <div className='room-container mb-4'>
            <Row gutter={[24, 16]}>
                <Col xs={24} lg={14} xl={12}>
                    <h6>Có  {newArr?.length} Kết Quả Được Tìm Thấy</h6>
                    <h4 className='title'>Chỗ ở tại khu vực bản đồ đã chọn</h4>
                    <Row gutter={[32, 16]}>
                        {renderRoomItem()}
                    </Row>
                </Col>
                <Col xs={24} lg={10} xl={12}>
                    <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >
                            <AnyReactComponent
                                lat={21.1010564}
                                lng={105.5164893}
                                text="My Home"
                            />
                        </GoogleMapReact>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
