import React from 'react'
import { Carousel, Card } from 'antd';
import './style.scss'


export default function Banner() {
    return (
        <Carousel autoplay className='d-none d-lg-block'
            dots>
            <div className='img__carousel'>
                <img src="https://danang-shopping.com/wp-content/uploads/2019/07/banner-website-cau-rong.jpg" alt="" />
                <Card
                    hoverable
                    style={{
                        width: 240,
                        height: 340,
                    }}
                    cover={<img alt="example" src="https://dulichkhampha24.com/wp-content/uploads/2020/02/tuong-ca-chep-hoa-rong-da-nang-2.jpg" />}
                >
                </Card>

            </div>
            <div className='img__carousel'>
                <img src="https://www.aseantraveller.net/source/img_news/4553.jpg" alt="" />
                <Card
                    hoverable
                    style={{
                        width: 240,
                        height: 340,
                    }}
                    cover={<img alt="example" src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/chua-mot-cot.jpg" />}
                >
                </Card>

            </div>
            <div className='img__carousel'>
                <img src="https://i.pinimg.com/originals/45/33/58/453358a3c0c7fe50b3bcdb07bca52de2.jpg" alt="" />
                <Card
                    hoverable
                    style={{
                        width: 240,
                        height: 340,
                    }}
                    cover={<img alt="example" src="https://rentapartment.vn/wp-content/uploads/2021/04/thong-tin-landmark-81.jpg" />}
                >
                </Card>
            </div>
        </Carousel>
    )
}
