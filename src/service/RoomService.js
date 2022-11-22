// Api Phòng
import { http } from "../util/config";

export default class RoomService {
    // lấy danh sách phòng theo vị trí
    getRoomList= (locationID) => {
    return http.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationID}`)
    }
    // lấy chi tiết phòng
    geDetailRoom = (id)=>{
        return http.get(`/dat-phong/${id}`)
    }
}