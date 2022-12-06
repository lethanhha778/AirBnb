// api Đặt phòng

import { http } from "../util/config";

class BookingRoomService {
    // lấy cái api này render ra từng phòng ở home
    getAllRoom = ()=>{
        return http.get(`api/phong-thue`)
    }

}
const bookingRoomService = new BookingRoomService()
export default bookingRoomService