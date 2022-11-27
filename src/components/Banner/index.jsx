import React from 'react'
import { Carousel, Card } from 'antd';
import './style.scss'


export default function Banner() {
    return (
        <Carousel autoplay className='d-none d-lg-block'
            dots>
            <div className='img__carousel'>
                <img src="https://badenmountain.sunworld.vn/wp-content/themes/halongcomplex/dist/images/background-1.jpg" alt="" />
                <Card
                    hoverable
                    style={{
                        width: 240,
                        height: 340,
                    }}
                    cover={<img alt="example" src="https://badenmountain.sunworld.vn/wp-content/uploads/2020/01/RAW_6966-Edit-768x513.jpg" />}
                >
                </Card>
            </div>
            <div className='img__carousel'>
                <img src="http://baogialai.com.vn/dataimages/201706/original/images2544706_l_10.jpg" alt="" />
                <Card
                    hoverable
                    style={{
                        width: 240,
                        height: 340,
                    }}
                    cover={<img alt="example" src="https://statics.vinpearl.com/dao-titop-quang-ninh-02_1625285135_1660475000.jpg" />}
                >
                </Card>

            </div>
            <div className='img__carousel'>
                <img src="	https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/10/21/761376/D-03.jpg" alt="" />
                <Card
                    hoverable
                    style={{
                        width: 240,
                        height: 340,
                    }}
                    cover={<img alt="example" src="https://fansipanlegend.sunworld.vn/wp-content/uploads/2018/09/chua-viet-trong-long-nui-dep-nhu-tien-canh-tren-dinh-fansipan-2000-3-768x598.jpg" />}
                >
                </Card>

            </div>

        </Carousel>
    )
}
