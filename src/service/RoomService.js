// Api Phòng
import { http } from "../util/config";

class RoomService {
    // lấy danh sách phòng theo vị trí
    getRoomList = (locationID) => {
        return http.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationID}`)
    }
    getDetailRoom = (id)=>{
        return http.get(`/api/phong-thue/${id}`)
    }

    //admin
    listRoom = () => {
        return http.get(`/api/phong-thue`)
    }

    detailRoom = (id)=>{
        return http.get(`/api/phong-thue/${id}`)
    }

    removeRoom = (id) => {
        return http.delete(`/api/phong-thue/${id}`)
    }

    addRoom = (room) => {
        return http.post(`/api/phong-thue/`, room);
    }

    updateRoom = (room, id) => {
        return http.put(`/api/phong-thue/${id}`, room);
    }

    upImageRoom = (file, id) => {
        return http.post(`/api/phong-thue/upload-hinh-phong?maPhong=${id}`, file);
    }
}

const roomService = new RoomService()
export default roomService