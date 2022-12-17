import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Divider, Row } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { dataIMG } from './dataImg';
import { roomList } from '../../redux/actions/BookingRoomAction';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './style.scss'


export default function CardRoom() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(roomList())
  }, [dispatch])
  const { arrRoom } = useSelector(state => state.BookingReducer)
  console.log(arrRoom);
  const renderRoomItem = () => {
    let room = arrRoom?.map((item, index) => {
      return { ...item, data: dataIMG[index] };
    });
    console.log(room)
    return room?.slice(0, 30).map((item, index) => {
      return <Col
        className="gutter-row" xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }} key={index} data-aos="flip-left" data-aos-duration="800" >
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
          <div className='room__decripton'>
            <h5 onClick={() => {
              navigate(`/detailRoom/${item.id}`)
            }}
              className='room__decripton-sites' ><span>{item.tenPhong}</span></h5>
          </div>
          <div className='room__area'>
            <span> <span className='price'>{item.giaTien}</span> $/ đêm</span>
            <span className='star '><AiFillStar />{`${item.data?.start}`}</span>
          </div>
        </div>
      </Col >;
    });
  };

  return (
    <div className='cardRoom'>
      <Divider orientation="left"><h2 className='title mt-3'>Phòng Nổi Bật</h2></Divider>
      <Row className='mt-5'
        gutter={[24, 24]}
      >
        {renderRoomItem()}
      </Row>
    </div>
  )
}
