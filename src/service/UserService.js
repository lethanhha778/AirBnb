import { http } from "../util/config";

// Api Nguoi Dung

class UserService {
    // gửi thông tin đăng ký
    register = (infoUserRegister) => {
        return http.post(`/api/auth/signup`, infoUserRegister)
    }
    // gửi thông tin đăng nhập
    login = (infoUserLogin) => {
        return http.post(`/api/auth/signin`, infoUserLogin);
    }
    infoUser = (id) => {
        return http.post(`/api/users/${id}`)
    }

}
const userService = new UserService()
export default userService