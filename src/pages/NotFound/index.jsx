import React from "react";
import { Col, Row } from 'antd';
import { useNavigate } from "react-router-dom";
import "./style.scss";

export default function NotFound() {
  const navigate = useNavigate()
  return <div className="container-notFound">
    <Row>
      <Col span={12} className='description-404'>
        <h1 className="title">Rất Tiếc !</h1>
        <h2>Có vẻ chúng tôi không tìm thấy trang bạn đang tìm kiếm.</h2>
        <button className="btn__back--home"
          onClick={() => { navigate('/home') }}
        >Về Trang Chủ</button>
      </Col>
      <Col span={12} className='col-img'></Col>
    </Row>
  </div>;
}
