import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLocation } from '../../redux/actions/LocationAction'
import { Col, Divider, Row } from 'antd';

import { AiFillStar } from "react-icons/ai";
import { Card } from 'antd';
import './style.scss'
import { useNavigate } from 'react-router-dom';

export default function CardLocation() {
  const { Meta } = Card;
  const dispatch = useDispatch()
  useEffect(() => {
    const action = getAllLocation()
    dispatch(action)
  }, [])
  const { allLocation } = useSelector(state => state.LocationReducer)
  console.log(allLocation);
  const navigate = useNavigate()
  const renderCardImg = () => {
    return allLocation.data?.map((item) => {
      return <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }} key={item.id} data-aos="zoom-out-up" data-aos-duration="1000">
        <Card
          hoverable
          onClick={() => { navigate(`/roomLisst/${item.id}`) }}
          cover={<img style={{ minHeight: '240px', maxHeight: '240px' }} alt="example" src={item.hinhAnh} />}
        >
          <div data-aos="flip-left" data-aos-duration="1000">
            <div className='location__decripton'>
              <h5 className='location__decripton-sites' >Địa Danh: <span>{item.tenViTri}</span></h5>
              <span><AiFillStar /></span>
            </div>
            <div className='location__area'>
              <h6>Tỉnh Thành: {item.tinhThanh}</h6>
              <h6>Quốc Gia: {item.quocGia}</h6>
            </div>
          </div>
        </Card>
      </Col>
    })
  }

  return (
    <div className='cardLocaTion'>
      <Divider orientation="left"><h2 className='title'> Địa Điểm Được Yêu Thích</h2></Divider>
      <Row
        gutter={[16, 24]}
      >
        {renderCardImg()}
      </Row>
    </div>
  )
}
