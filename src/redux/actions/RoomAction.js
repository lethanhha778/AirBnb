import roomService from "../../service/RoomService";
import { ADD_ROOM, DEL_ROOM, GET_DETAIL_ROOM, GET_LIST_ROOM, SET_ALERT, UPDATE_ROOM, UP_IMAGE_ROOM } from "../type/RoomType";

//admin
export const listRoomAction = () => {
    return (dispatch2) => {
        let promise = roomService.listRoom();
        promise.then((result) => {
            let action2 = {
                type: GET_LIST_ROOM,
                arrRoom: result.data.content,
            }
            dispatch2(action2);
        });
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        });
    }
}

export const getRoomAction = (id = '') => {
    return (dispatch2) => {
        let promise = roomService.detailRoom(id);
        promise.then((result) => {
            let action2 = {
                type: GET_DETAIL_ROOM,
                room: result.data.content,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        })
    }
}

export const removeRoomAction = (id = '') => {
    return (dispatch2) => {
        let promise = roomService.removeRoom(id);
        promise.then((result) => {
            let action2 = {
                type: DEL_ROOM,
                arletContent: result.data.message,
                roomId: id,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        })
    }
}

export const addRoomAction = (room = {}) => {
    return (dispatch2) => {
        let promise = roomService.addRoom(room);
        promise.then((result) => {
            let action2 = {
                type: ADD_ROOM,
                addRoom: result.data.content,
                arletContent:  result.data.message,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        })
    }
}

export const updateRoomAction = (room = {}, id = '') => {
    return (dispatch2) => {
        let promise = roomService.updateRoom(room, id);
        promise.then((result) => {
            let action2 = {
                type: UPDATE_ROOM,
                arletContent: "Cập nhập phòng thành công",
                updateRoom: result.data.content,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        })
    }
}

export const upImageRoomAction = (file = [], id = '') => {
    return (dispatch2) => {
        let promise = roomService.upImageRoom(file, id);
        promise.then((result) => {
            let action2 = {
                type: UP_IMAGE_ROOM,
                arletContent: "Cập nhập ảnh thành công",
                upImageRoom: result.data.content,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        })
    }
}

export const setAlertRoomAction = (arletContent = '') => {
    return (dispatch2) => {
        let action2 = {
            type: SET_ALERT,
            arletContent: arletContent,
        }
        dispatch2(action2);
    }
}