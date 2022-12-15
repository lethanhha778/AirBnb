import userService from "../../service/UserService";
import { ADD_USER, DEL_USER, GET_DETAIL_USER, GET_LIST_USER, GET_SEARCH_USER, SET_ALERT, UPDATE_USER } from "../type/UserType";


//admin
export const listUserAction = () => {
    return (dispatch2) => {
        let promise = userService.listUser();
        promise.then((result) => {
            let action2 = {
                type: GET_LIST_USER,
                arrUser: result.data.content,
            }
            dispatch2(action2);
        });
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: [error.response?.data.content, error.response?.data.statusCode],
            }
            dispatch2(action2);
        });
    }
}

export const getUserAction = (id = '') => {
    return (dispatch2) => {
        let promise = userService.detailUser(id);
        promise.then((result) => {
            let action2 = {
                type: GET_DETAIL_USER,
                user: result.data.content,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: [error.response?.data.content, error.response?.data.statusCode],
            }
            dispatch2(action2);
        })
    }
}

export const removeUserAction = (id = '') => {
    return (dispatch2) => {
        let promise = userService.removeUser(id)
        promise.then((result) => {
            let action2 = {
                type: DEL_USER,
                arletContent: [result.data.message, 201],
                userId: id,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: [error.response?.data.content, error.response?.data.statusCode],
            }
            dispatch2(action2);
        })
    }
}

export const addUserAction = (user = {}) => {
    return (dispatch2) => {
        let promise = userService.addUser(user)
        promise.then((result) => {
            let action2 = {
                type: ADD_USER,
                arletContent: ["Thêm tài khoản thành công", 200],
                addUser: result.data.content,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: [error.response?.data.content, error.response?.data.statusCode]
            }
            dispatch2(action2);
        })
    }
}

export const updateUserAction = (user = {}, id = '') => {
    return (dispatch2) => {
        let promise = userService.updateUser(user, id)
        promise.then((result) => {
            let action2 = {
                type: UPDATE_USER,
                arletContent: ["Cập nhập tài khoản thành công", 200],
                updateUser: result.data.content,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: [error.response?.data.content, error.response?.data.statusCode]
            }
            dispatch2(action2);
        })
    }
}

export const searchUserAction = (name = '') => {
    return (dispatch2) => {
        let promise = userService.searchUser(name);
        promise.then((result) => {
            let action2 = {
                type: GET_SEARCH_USER,
                arrUser: result.data.content,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            console.log(error)
            let action2 = {
                type: SET_ALERT,
                arletContent: [error.response?.data.content, error.response?.data.statusCode],
            }
            dispatch2(action2);
        })
    }
}

export const setAlertUserAction = (arletContent = []) => {
    return (dispatch2) => {
        let action2 = {
            type: SET_ALERT,
            arletContent: arletContent,
        }
        dispatch2(action2);
    }
}