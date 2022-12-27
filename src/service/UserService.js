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

    //admin
    listUser = () => {
        return http.get(`/api/users`);
    }

    listPageUser = (index, size) => {
        return http.get(`api/users/phan-trang-tim-kiem?pageIndex=${index}&pageSize=${size}`);
    }

    detailUser = (id) => {
        return http.get(`/api/users/${id}`);
    }

    removeUser = (id) => {
        return http.delete(`api/users?id=${id}`);
    }

    addUser = (user) => {
        return http.post(`/api/users`, user);
    }

    updateUser = (user, id) => {
        return http.put(`/api/users/${id}`, user);
    }

    searchUser = (name) => {
        return http.get(`/api/users/search/${name}`);
    }

    upImageUser = (file) => {
        return http.post(`api/users/upload-avatar`, file);
    }

}

const userService = new UserService()
export default userService