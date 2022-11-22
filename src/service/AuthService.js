
import { http } from "../util/config";

export default class AuthService {
    // gửi thông tin đăng ký
    register= (infoUserRegister) => {
    return http.post(`/api/auth/signup`,infoUserRegister)
    }
    // gửi thông tin đăng nhập
    login = (infoUserLogin)=>{
        return http.post(`/api/auth/signin`, infoUserLogin);
    }

}