import { http } from "../util/config";

// Api Nguoi Dung

export default class UserService {
    // gửi thông tin đăng ký
    register= (infoUserRegister) => {
    return http.post(`/api/auth/signup`,infoUserRegister)
    }
    // gửi thông tin đăng nhập
    login = (infoUserLogin)=>{
        return http.post(`/api/auth/signin`, infoUserLogin);
    }
    infoUser = (id)=>{
        return http.post(`/api/users/${id}`)
    }

}