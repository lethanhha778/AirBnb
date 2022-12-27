import { http } from "../util/config";
// api auth
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
        return http({
            method: "POST",
            url: '/api/users/upload-avatar',
            data: formData,
            showErr: true
        })
    }
    editProfile = (infoUserLogin) => {
        const url = `/api/users/${infoUserLogin.id}`
        const data = {
            avatar: infoUserLogin.avatar,
            birthday: infoUserLogin.birthday,
            email: infoUserLogin.email,
            gender: infoUserLogin.gender,
            name: infoUserLogin.name,
            phone: infoUserLogin.phone

        }
        return http({ method: 'PUT', data, url, showErr: true })
    }


}

export default new AuthService()