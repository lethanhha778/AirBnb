import React from "react";
import { Col, Divider, Row } from 'antd';
import { BsGlobe2 } from "react-icons/bs";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import './style.scss'

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <div >
              <h5>GIỚI THIỆU</h5>
              <ul>
                <li><a href="">Phương Thức Hoạt Động</a></li>
                <li><a href="">Trang Tin Tức</a></li>
                <li><a href="">Nhà Đầu Tư</a></li>
                <li><a href="">AirBnb Plus</a></li>
                <li><a href="">AirBnb Luxe</a></li>
                <li><a href="">Hotel Toningt</a></li>
                <li><a href="">AirBnb for work</a></li>
                <li><a href="">Nhờ Có Host, Mọi Điều Có Thể</a></li>
                <li><a href="">Cơ Hội Nghề Nghiệp</a></li>
                <li><a href="">Thư Của Nhà Sáng Lập</a></li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <div >
              <h5>CỘNG ĐỒNG</h5>
              <ul>
                <li><a href="">Sự Đa Dạng</a></li>
                <li><a href="">Tiện Nghi Phù Hợp</a></li>
                <li><a href="">Đối Tác Liên Kết</a></li>
                <li><a href="">Chỗ Ở Cho Tuyến Đầu</a></li>
                <li><a href="">Lượt giới thiệu của khách</a></li>
                <li><a href="">AirBnb.org</a></li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <div >
              <h5>ĐÓN TIẾP KHÁCH</h5>
              <ul>
                <li><a href="">Cho Thuê Nhà</a></li>
                <li><a href="">Tổ Chức Trải Nghiệm</a></li>
                <li><a href="">Đối Tác Liên Kết</a></li>
                <li><a href="">Đón Tiếp Khách Có Trách Nhiệm</a></li>
                <li><a href="">Trung Tâm Tài Nguyên</a></li>
                <li><a href="">Trung Tâm Cộng Đồng</a></li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <div >
              <h5>HỖ TRỢ</h5>
              <ul>
                <li><a href="">Biện Pháp Ứng Phó Với Đại Dịch Covid-19 Của Chúng Tôi</a></li>
                <li><a href="">Trung Tâm Trợ Giúp</a></li>
                <li><a href="">Các Tùy Chọn Hủy</a></li>
                <li><a href="">Hỗ Trợ Khu Dân Cư</a></li>
                <li><a href="">Tin Cậy Và An Toàn</a></li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© 2022 Airbnb, Inc.All right reserved</span>
            <ul>
              <li>Quyền Riêng Tư </li>
              <li>Điều Khoản</li>
              <li>Sơ Đồ Trang Web</li>
            </ul>
          </div>
          <div className="footer-bottom-right">
            <span className="language">  <BsGlobe2 /> <u>Tiếng Việt</u> </span>
            <span className="dollar"> $ <u>USD</u></span>
            <div className="footer-icon">
              <FaFacebookF className="icon" />
              <AiOutlineTwitter className="icon" />
              <AiFillInstagram className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
