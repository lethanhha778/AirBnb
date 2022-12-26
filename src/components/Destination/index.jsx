import React from 'react'
import { Col, Divider, Row } from 'antd';
import './style.scss'

export default function Destination() {
    return (
        <div className='destination-container' data-aos="fade-right" data-aos-duration="1000">
            <Divider orientation="left"><h2 className='title mt-3'>Điểm Đến Gần Đây</h2></Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className='d-flex'>
                        <img src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413766/airBnB/Explore%20nearby/Frame_9-2_ovogvc.png" alt="" />
                        <div className='px-3' >
                            <h6 className='title-city'>Hà Nội</h6>
                            <p>1 giờ lái xe</p>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className='d-flex'>
                        <img src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413809/airBnB/Explore%20nearby/Frame_9_donn3q.png" alt="" />
                        <div className='px-3' >
                            <h6 className='title-city'>Cần Thơ</h6>
                            <p>3 giờ lái xe</p>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className='d-flex'>
                        <img src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413813/airBnB/Explore%20nearby/Frame_9-1_xlccyu.png" alt="" />
                        <div className='px-3' >
                            <h6 className='title-city'>Nha Trang</h6>
                            <p>3 giờ bay</p>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className='d-flex'>
                        <img src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413767/airBnB/Explore%20nearby/Frame_9-4_upwubk.png" alt="" />
                        <div className='px-3' >
                            <h6 className='title-city'>Phú Quốc</h6>
                            <p>2 giờ bay </p>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className='d-flex'>
                        <img src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413767/airBnB/Explore%20nearby/Frame_9-6_g2lxxg.png" alt="" />
                        <div className='px-3' >
                            <h6 className='title-city'>Tuy Hòa</h6>
                            <p>3 giờ bay</p>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className='d-flex'>
                        <img src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413767/airBnB/Explore%20nearby/Frame_9-3_a7dltw.png" alt="" />
                        <div className='px-3' >
                            <h6 className='title-city'>Đà Nẵng</h6>
                            <p>12h lái xe</p>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className='d-flex'>
                        <img src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413766/airBnB/Explore%20nearby/Frame_9-2_ovogvc.png" alt="" />
                        <div className='px-3' >
                            <h6 className='title-city'>Đà Lạt</h6>
                            <p>5 giờ lái xe</p>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
                    <div className='d-flex'>
                        <img src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413767/airBnB/Explore%20nearby/Frame_9-5_lpnabl.png" alt="" />
                        <div className='px-3' >
                            <h6 className='title-city'>Huế</h6>
                            <p>2h giờ bay</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
