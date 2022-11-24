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
}
const locationService = new LocationService()
export default locationService