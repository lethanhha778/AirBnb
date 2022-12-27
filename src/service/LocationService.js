import { http } from "../util/config";
// Api Vị trí

class LocationService {
    // lấy danh sách vị trí để tìm kiếm
    getLocationList = () => {
        return http.get(`/api/vi-tri`)
    }
    // lấy danh sách phân trang tìm kiếm
    getAllLocation = () => {
        return http.get(`/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=30`)
    }

    //admin
    listLocation = (index, size) => {
        return http.get(`api/vi-tri/phan-trang-tim-kiem?pageIndex=${index}&pageSize=${size}`)
    }

    detailLocation = (id) => {
        return http.get(`/api/vi-tri/${id}`)
    }

    removeLocation = (id) => {
        return http.delete(`/api/vi-tri/${id}`)
    }

    addLocation = (location) => {
        return http.post(`/api/vi-tri`, location);
    }

    updateLocation = (location, id) => {
        return http.put(`/api/vi-tri/${id}`, location);
    }

    upImageLocation = (file, id) => {
        return http.post(`api/vi-tri/upload-hinh-vitri?maViTri=${id}`, file);
    }
}

const locationService = new LocationService()
export default locationService