// Api Vị trí

import { http } from "../util/config";

class LocationService {
    // lấy danh sách vị trí để tìm kiếm
    getLocationList= () => {
    return http.get(`/api/vi-tri`)
    }
    // lấy danh sách phân trang tìm kiếm
    // phải có page index, page size, keyword truyền vào data
    getLocationSearch = (data)=>{
        return http.get(`/api/vi-tri/phan-trang-tim-kiem`,data)
    }

    //admin
    listLocation = () => {
        return http.get(`/api/vi-tri`)
    }

    detailLocation = (id)=>{
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