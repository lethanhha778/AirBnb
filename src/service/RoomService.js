// Api Phòng
import { http } from "../util/config";

class RoomService {
    // lấy danh sách phòng theo vị trí
    getRoomList = (locationID) => {
        return http.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationID}`)
    }
    // lấy chi tiết phòng
    geDetailRoom = (id) => {
        return http.get(`/dat-phong/${id}`)
    }
}
const roomService = new RoomService()
export default roomService