// api Đặt phòng

import { http } from "../util/config";

class BookingRoomService {
    // lấy chi tiết phòng thuê
    getDetailRoom = (id) => {
        return http.get(`api/phong-thue/${id}`)
    }
    // lấy cái api này render ra từng phòng ở home
    // api của vị trí ko dẫn đén đc chi tiết phòng
    getAllRoom = ()=>{
        return http.get(`api/phong-thue`)
    }

}
const bookingRoomService = new BookingRoomService()
export default bookingRoomService