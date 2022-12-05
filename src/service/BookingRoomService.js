// Api đặt phòng
import { http } from "../util/config";

class BookingRoomService {
   
    //admin
    listBooking = () => {
        return http.get(`/api/dat-phong`)
    }

    detailBooking = (id)=>{
        return http.get(`/api/dat-phong/${id}`)
    }

    removeBooking = (id) => {
        return http.delete(`/api/dat-phong/${id}`)
    }

    addBooking = (booking) => {
        return http.post(`/api/dat-phong/`, booking);
    }

    updateBooking = (booking, id) => {
        return http.put(`/api/dat-phong/${id}`, booking);
    }
}

const bookingRoomService = new BookingRoomService()
export default bookingRoomService