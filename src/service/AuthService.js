
import { http } from "../util/config";

class AuthService {
    // gửi thông tin đăng ký
    register = (infoUserRegister) => {
        return http.post(`/api/auth/signup`, infoUserRegister)
    }
    // gửi thông tin đăng nhập
    login = (infoUserLogin) => {
        return http.post(`/api/auth/signin`, infoUserLogin);
    }
    uploadAvatar = (file) => {
        const formData = new FormData()
        formData.append('formFile', file)
        return http.post('/api/users/upload-avatar', formData)
    }
    editProfile = (infoUserLogin) => {
        const url = `/api/users/${infoUserLogin.id}`
        const payload = {
            avatar: infoUserLogin.avatar,
            birthday: infoUserLogin.birthday,
            email: infoUserLogin.email,
            gender: infoUserLogin.gender,
            name: infoUserLogin.name,
            phone: infoUserLogin.phone

        }
        return http.put(url, payload);
    }


}

export default new AuthService()