import React from 'react'
import { Col, Divider, Row } from 'antd';
import './style.scss'

export default function CommitImg() {
    return (
        <div className='commitImg-container'>
            <Divider orientation="left"><h2 className='title'>Ở Bất Cứ Đâu</h2></Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }} data-aos="zoom-in"  data-aos-duration="2000">
                    <div className='d-flex flex-column '>
                        <img src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQutrtopduFx3xy8gy5Me0iKvAK3EdQYVsATQ22VrZHoDciMN5Qaj3PAnuiTca6eK5AjF_zJ4NUbWcHnq2HsbE" alt="" />
                        <div className='py-3'>
                            <h6 className='title-home'>Toàn Bộ Nhà</h6>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span:12 }} lg={{ span: 6 }} data-aos="zoom-in"  data-aos-duration="2000">
                    <div className='d-flex flex-column '>
                        <img src="https://kenh14cdn.com/2020/5/29/photo-2-15905738364271766034140-1590725720554780956679.jpg" alt="" />
                        <div className='py-3'>
                            <h6 className='title-home'>Chỗ Ở Độc Đáo</h6>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }} data-aos="zoom-in"  data-aos-duration="2000">
                    <div className='d-flex flex-column '>
                        <img src="https://kenh14cdn.com/2020/5/29/photo-3-15905738364282136806089-1590725720557132867913.jpg" alt="" />
                        <div className='py-3'>
                            <h6 className='title-home'>Trang Trại Và Thiên Nhiên</h6>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row py-3" xs={{ span: 12 }} md={{ span: 12}} lg={{ span: 6 }} data-aos="zoom-in"  data-aos-duration="2000">
                    <div className='d-flex flex-column'>
                        <img src="https://homestay.review/wp-content/uploads/2019/03/homestay-th%C3%BA-cung.jpg" alt="" />
                        <div className='py-3'>
                            <h6 className='title-home'>Cho Phép Mang Theo Thú Cưng</h6>
                        </div>
                    </div>
                </Col>

            </Row>
            <div className='conection__customer ' data-aos="zoom-in"  data-aos-duration="2000">
                <div className='img-full'>
                </div>
                <div className="conection__customer-content">
                    <h3>Trở Thành Chủ Nhà</h3>
                    <p>Chúng Tôi Sẽ Thay Bạn Tìm Khách Hàng</p>
                    <p>Kết Nối Mọi Người Lại Với Nhau</p>
                    <button>Go</button>
                </div>
            </div>
        </div>
    )
}
