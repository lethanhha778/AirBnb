import React from "react";
import { Col, Row } from 'antd';
import { BsGlobe2 } from "react-icons/bs";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import './style.scss'

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={12} md={8} lg={6}>
            <div >
              <h5>GIỚI THIỆU</h5>
              <ul>
                <li>Phương Thức Hoạt Động</li>
                <li>Trang Tin Tức</li>
                <li>Nhà Đầu Tư</li>
                <li>AirBnb Plus</li>
                <li>AirBnb Luxe</li>
                <li>Hotel Toningt</li>
                <li>AirBnb for work</li>
                <li>Nhờ Có Host, Mọi Điều Có Thể</li>
                <li>Cơ Hội Nghề Nghiệp</li>
                <li>Thư Của Nhà Sáng Lập</li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row" xs={12} md={8} lg={6}>
            <div >
              <h5>CỘNG ĐỒNG</h5>
              <ul>
                <li>Sự Đa Dạng</li>
                <li>Tiện Nghi Phù Hợp</li>
                <li>Đối Tác Liên Kết</li>
                <li>Chỗ Ở Cho Tuyến Đầu</li>
                <li>Lượt giới thiệu của khách</li>
                <li>AirBnb.org</li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row" xs={12} md={8} lg={6}>
            <div >
              <h5>ĐÓN TIẾP KHÁCH</h5>
              <ul>
                <li>Cho Thuê Nhà</li>
                <li>Tổ Chức Trải Nghiệm</li>
                <li>Đối Tác Liên Kết</li>
                <li>Đón Tiếp Khách Có Trách Nhiệm</li>
                <li>Trung Tâm Tài Nguyên</li>
                <li>Trung Tâm Cộng Đồng</li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row" xs={12} md={8} lg={6}>
            <div >
              <h5>HỖ TRỢ</h5>
              <ul>
                <li>Biện Pháp Ứng Phó Với Đại Dịch Covid-19 Của Chúng Tôi</li>
                <li>Trung Tâm Trợ Giúp</li>
                <li>Các Tùy Chọn Hủy</li>
                <li>Hỗ Trợ Khu Dân Cư</li>
                <li>Tin Cậy Và An Toàn</li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© 2022 Airbnb, Inc.All right reserved</span>
          </div>
          <div className="footer-bottom-center">
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
