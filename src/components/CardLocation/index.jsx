import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLocation } from '../../redux/actions/LocationAction'
import { Col, Divider, Row } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { AiFillStar } from "react-icons/ai";
import { Card } from 'antd';
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { dataIMG } from './dataImg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function CardLocation() {
  const dispatch = useDispatch()
  useEffect(() => {
    const action = getAllLocation()
    dispatch(action)
  }, [])
  const { allLocation } = useSelector(state => state.LocationReducer)
  console.log(allLocation);
  const [newRoom, setNewRoom] = useState([]);
  useEffect(() => {
    setNewRoom(allLocation.data)
  }, [allLocation])
  const renderRoomItem = () => {
    let room = newRoom?.map((item, index) => {
      return { ...item, data: dataIMG[index] };
    });
    console.log(room)
    return room?.slice(0, 18).map((item, index) => {
      return <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} key={index} data-aos="zoom-out-up" data-aos-duration="1000">
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
            <h5 className='location__decripton-sites' >Địa Danh: <span>{item.tenViTri}</span></h5>
            <span><AiFillStar /></span>
          </div>
          <div className='location__area'>
            <h6>Tỉnh Thành: {item.tinhThanh}</h6>
            <h6>Quốc Gia: {item.quocGia}</h6>
          </div>
          <button
            onClick={() => {
              navigate(`/roomList/${item.id}`)
            }}
            className='btn-searchRoom' > Tìm Phòng</button>
        </div>

      </Col >;
    });
  };


  const navigate = useNavigate()

  return (
    <div className='cardLocaTion'>
      <Row className='mt-5'
        gutter={[16, 24]}
      >
        {renderRoomItem()}
      </Row>
    </div>
  )
}
