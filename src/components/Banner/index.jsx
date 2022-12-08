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
                    cover={<img alt="example" src="https://cdn3.ivivu.com/2022/08/cong-troi-dong-giang-ivivu-4.jpg" />}
                >
                </Card>
            </div>
            <div className='img__carousel'>
                <img src="https://dulichdiaphuong.com/imgs/tinh-cao-bang/bai-tinh.jpg" alt="" />
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
                <img src="https://www.dideden.com/wp-content/uploads/2022/09/cac-dia-diem-du-lich-sapa-12.jpg" alt="" />
                <Card
                    hoverable
                    style={{
                        width: 240,
                        height: 340,
                    }}
                    cover={<img alt="example" src="https://tcspmgnthn.edu.vn/wp-content/uploads/2022/07/mieu-ta-da-lat.jpg" />}
                >
                </Card>

            </div>

        </Carousel>
    )
}
