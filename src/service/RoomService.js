// Api Phòng
import { http } from "../util/config";

class RoomService {
    // lấy danh sách phòng theo vị trí
    getRoomList = (locationID) => {
        return http.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationID}`)
    }
}
const roomService = new RoomService()
export default roomService