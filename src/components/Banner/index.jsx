import React from 'react'
import { Carousel, Card } from 'antd';
import './style.scss'


export default function Banner() {
    return (
        <Carousel autoplay className='d-none d-lg-block'
            dots>
            <div className='img__carousel'>
                <img src="https://haycafe.vn/wp-content/uploads/2022/03/Anh-thien-nhien-Viet-Nam-tren-ruong-bac-thang.jpg" alt="" />
                <h5 className="title">Tây Bắc Việt Nam</h5>
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
                <img src="https://phongnhakebang.vn/uploads/news/2016_12/http_2f2fcdn.cnn.com2fcnnnext2fdam2fassets2f160824165257-hang-son-doong-1watch-out-for-dinosaurs-sunbeam.jpg?1523584396273" alt="" />
                <h5 className="title">Động Phong Nha</h5>   
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
                <img src="https://pdp.edu.vn/wp-content/uploads/2021/07/hinh-anh-thien-nhien-viet-nam-tuyet-dep.jpg" alt="" />
                <h5 className="title">Tây Nguyên Việt Nam</h5>

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
