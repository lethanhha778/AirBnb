import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoom } from '../../redux/actions/RoomAction';
import { useParams } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { dataIMG } from '../../components/CardLocation/dataImg';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function RoomList() {
  let { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllRoom(id))
  }, [])

  const { arrRoom } = useSelector(state => state.RoomReducer)
  console.log(arrRoom);
  const [newArrRoom, setNewArrRoom] = useState([]);
  console.log(newArrRoom);
  useEffect(() => {
    setNewArrRoom(arrRoom)
  }, [arrRoom])
  const defaultProps = {
    center: {
      lat: 21.1010564,
      lng: 105.5164893
    },
    zoom: 12
  };
  const renderRoomItem = () => {
    let room = newArrRoom?.map((item, index) => {
      return { ...item, data: dataIMG[index] };
    });
    console.log(room)
    return room?.slice(0, 15).map((item, index) => {
      return <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} key={index} data-aos="zoom-out-up" data-aos-duration="1000">
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
          <h5>{item.tenPhong}</h5>
          <div className='d-flex justify-content-between'>
            <p>{item.giuong} giường</p>
            <p>Số người ở: {item.khach} người</p>
          </div>
          <span>Giá phòng 1 đêm: {item.giaTien} $</span>
        </div>

      </Col >;
    });
  };

  return (
    <div className='room-container'>
      <Row gutter={[24, 16]}>
        <Col xs={24} lg={12}>
          <h6>Có  {arrRoom?.length} Kết Quả Được Tìm Thấy</h6>
          <h4 className='title'>Chỗ ở tại khu vực bản đồ đã chọn</h4>
          <Row gutter={[32, 16]}>
            {renderRoomItem()}
          </Row>
        </Col>
        <Col xs={24} lg={12}>
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={21.1010564}
                lng={105.5164893}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </Col>
      </Row>
    </div>
  )
}
