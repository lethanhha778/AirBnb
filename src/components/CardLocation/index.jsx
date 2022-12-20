import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Divider, Row } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { FaSearchLocation } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { dataLocation } from './dataLocation'
import { getAllLocation } from '../../redux/actions/LocationAction';
import './style.scss'


export default function CardLocation() {
    const dispatch = useDispatch()
    useEffect(() => {
        const action = getAllLocation()
        dispatch(action)
    }, [dispatch])

    const { allLocation } = useSelector(state => state.LocationReducer)
    const renderRoomItem = () => {
        let room = allLocation.data?.map((item, index) => {
            return { ...item, data: dataLocation[index] };
        });

        return room?.slice(1, 9).map((item, index) => {
            return <Col
                className="gutter-row"
                xs={24} sm={12} md={12} lg={8} xl={6}
                key={index}
                data-aos="flip-left" data-aos-duration="800" >
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
                    className="mySwiper"
                >
                    <SwiperSlide>
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
                <div data-aos="flip-left" data-aos-duration="1000">
                    <div className='location__decripton'>
                        <h5 className='location__decripton-sites' ><span>{item.tenViTri}</span></h5>
                        <span className='search'><FaSearchLocation />{`${item.data?.search}`}</span>
                    </div>
                    <div className='location__area'>
                        <span>{item.tinhThanh} - {item.quocGia}</span>
                    </div>
                </div>
            </Col >
        })
    }

    return (
        <div className='cardLocaTion'>
            <Divider orientation="left"><h2 className='title mt-3'>Điểm Đến Nổi Tiếng 2022</h2></Divider>
            <Row className='mt-5'
                gutter={[24, 24]}
            >
                {renderRoomItem()}
            </Row>
        </div>
    )
}
