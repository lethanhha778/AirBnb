import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select, Space, DatePicker, } from 'antd';
import moment from 'moment/moment';
import { bookingRoomAction, listBookingAction } from '../../../redux/actions/BookingRoomAction';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { openCustomNotificationWithIcon } from '../../../util/func';
import { useNavigate } from 'react-router-dom';
dayjs.extend(customParseFormat);

export default function CardBooking(props) {
    const serviceCharge = Number(5)
    const navigate = useNavigate()
    const [datePicker, setDatePicker] = useState(['', ''])
    const { loggedIn } = useSelector((state) => state.AuthReducer);
    const [date, setDate] = useState(1)
    const [totalPay, setTotalPay] = useState(0)
    const [people, setPeople] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listBookingAction())
    }, [dispatch])
    const idUser = JSON.parse(localStorage.getItem('USER_INFO'));
    const { RangePicker } = DatePicker;
    const disabledDate = (current) => {
        // set disabled ngày đã qua
        let customDate = moment().format("YYYY-MM-DD");
        return current && current < moment(customDate, "YYYY-MM-DD");
    };
    const onChange = (date, dateString) => {
        setDatePicker(dateString)
        totalPriceOfDays(dateString)
    };
    const detailRoom = props.data
    const totalPriceOfDays = (date) => {
        const totalMilisecond = Date.parse(`${date[1]}`) - Date.parse(`${date[0]}`)
        const totalDate = Number(totalMilisecond / 86400000)
        const totalPay = detailRoom.giaTien * totalDate
        setDate(totalDate)
        setTotalPay(totalPay)
    }
    const allToatal = () => {
        if (totalPay === 0) {
            return detailRoom.giaTien + serviceCharge
        }
        return totalPay + serviceCharge
    }
    const onChangePeople = (value) => {
        setPeople(Number(value))
    };
    const BookRoom = () => {
        if (datePicker[0] === '' || datePicker[1] === '' || people === 0) {
            openCustomNotificationWithIcon(
                "warning",
                "Failed",
                "Còn trường dữ liệu chưa hoàn thành"
            )
        }
        else if (!loggedIn) {
            navigate("/auth/login")
        }
        else {
            const info = {
                maPhong: props.id,
                ngayDen: datePicker[0],
                ngayDi: datePicker[1],
                soLuongKhach: people,
                maNguoiDung: idUser.id
            }
            dispatch(bookingRoomAction(info))
        }
    }

    return (
        <div className="ticket-pay">
            <h6 className='title-pay'> <span>${detailRoom.giaTien}</span> đêm</h6>
            <div className="input__choose-item">
                <Space direction="vertical">
                    <RangePicker defaultValue={moment()} disabledDate={disabledDate} onChange={onChange} />
                </Space>
            </div>
            <div className="input__choose-item">
                <Select
                    showSearch
                    placeholder="Số Người"
                    optionFilterProp="children"
                    onChange={onChangePeople}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        {
                            value: '1',
                            label: '1 Người',
                        },
                        {
                            value: '2',
                            label: '2 Người',
                        },
                        {
                            value: '3',
                            label: '3 Người',
                        },
                        {
                            value: '4',
                            label: '4 Người',
                        },
                        {
                            value: '5',
                            label: '5 Người',
                        }
                    ]}
                />
            </div>
            <button
                onClick={() => { BookRoom() }}
                className='btn-bookingRoom'>
                <span>Đặt Phòng</span>
            </button>
            <p className='text-center'>Bạn Vẫn Chưa Bị Trừ Tiền</p>
            <div className='total__pay'>
                <div>
                    <h6>${detailRoom.giaTien} x {date} đêm</h6>
                </div>
                <div>
                    {totalPay === 0
                        ? <h6> ${detailRoom.giaTien} </h6>
                        : <h6> ${totalPay}</h6>}
                </div>
            </div>
            <div className='total__service'>
                <div>
                    <h6>Phí Dịch Vụ</h6>
                </div>
                <div>
                    <h6>${serviceCharge}</h6>
                </div>
            </div>
            <div className='total__pay total-end'>
                <div>
                    <h4>Tổng Trước Thuế</h4>
                </div>
                <div>
                    <h6>${allToatal()}</h6>
                </div>
            </div>
        </div>
    )
}
