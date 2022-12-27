import React, { useEffect, useState } from 'react';
import { Col, Row, Slider } from 'antd';
import GoogleMapReact from 'google-map-react';
import './index.scss'

export default function HostHome() {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        document.title = "Cho Thuê Phòng";
    }, []);
    const price = Number(7)
    const [total, setTotal] = useState(14)
    const [num, setNum] = useState(2)
    const defaultProps = {
        center: {
            lat: 16.054077,
            lng: 108.2213612
        },
        zoom: 12
    };
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const onChange = (number) => {
        setNum(number)
        setTotal(number * price)
    }
    return (
        <div className='host-home'>
            <Row gutter={[24, 24]}>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} className='col-left'>
                    <h1 className='title'>Cho thuê nhà trên Airbnb.</h1>
                    <h1>Bạn có thể kiếm được</h1>
                    <h1 className='prices'>{total}$</h1>
                    <p><span>{num} đêm</span>  với giá ước tính  ${price} mỗi đêm</p>
                    <Slider defaultValue={2} onChange={onChange} max={30} min={1} />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <div style={{ height: '70vh', width: '100%', borderRadius: '40px' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >
                            <AnyReactComponent
                                lat={16.0473502}
                                lng={108.2270697}
                                text="My Home"
                            />
                        </GoogleMapReact>
                    </div>
                </Col>
            </Row>
            <h1 className='setup' data-aos="fade-up">Dễ dàng cho thuê nhà trên Airbnb với Airbnb Setup</h1>
            <div className='img-banner' data-aos="fade-up">

            </div>
            <Row gutter={[48]} className='host-room'>
                <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} data-aos="flip-up" data-aos-duration="1000">
                    <h5>Nhận sự hướng dẫn riêng từ một Chủ nhà siêu cấp</h5>
                    <h6>Chúng tôi sẽ kết nối bạn với một Chủ nhà siêu cấp trong khu vực của bạn, người sẽ hướng dẫn bạn từ câu hỏi đầu tiên cho đến vị khách đầu tiên – qua điện thoại, cuộc gọi video hoặc tính năng trò chuyện.</h6>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} data-aos="flip-up" data-aos-duration="2000" >
                    <h5>Vị khách có kinh nghiệm cho lượt đặt phòng đầu tiên của bạn</h5>
                    <h6>Với lượt đặt phòng đầu tiên, bạn có thể lựa chọn chào đón một khách có kinh nghiệm, đã có ít nhất 3 kỳ ở và lịch sử hoạt động tốt trên Airbnb.</h6>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} data-aos="flip-up" data-aos-duration="3000">
                    <h5>Hỗ trợ đặc biệt từ Airbnb</h5>
                    <h6>Chỉ cần nhấn nút là Chủ nhà mới có thể liên hệ với nhân viên Hỗ trợ cộng đồng được đào tạo đặc biệt, có thể trợ giúp về mọi vấn đề, từ sự cố tài khoản cho đến hỗ trợ thanh toán.</h6>
                </Col>
            </Row>
        </div >
    )
}
