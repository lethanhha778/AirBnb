import { GET_DETAIL_ROOM, GET_LIST_ROOM } from "../type/RoomType";
import { hiddenLoadingAction, loadingAction } from "./LoadingAction";
import roomService from "../../service/RoomService";
import { ADD_ROOM, DEL_ROOM, GET_DETAIL_ROOM_AD, GET_LIST_ROOM_AD, SET_ALERT, UPDATE_ROOM, UP_IMAGE_ROOM } from "../type/RoomType";

// lấy ds tất cả phòng
export const getAllRoom = (id) => {
    return (dispatch) => {
        dispatch(loadingAction)
        let promise = roomService.getRoomList(id)
        promise.then((res) => {
            console.log(res.data.content)
            const action = {
                type: GET_LIST_ROOM,
                arrRoom: res.data.content
            }
            dispatch(action)
            dispatch(hiddenLoadingAction)
        })
        promise.catch((err) => {
            console.log(err);
        })
    }
}
// lấy chi tiết phòng đc chọn
export const getDetailRoom = (id)=>{
    return (dispatch)=>{
        dispatch(loadingAction)
        const promise = roomService.getDetailRoom(id)
        promise.then((res) => { 
            console.log(res.data.content)
            const action = {
                type: GET_DETAIL_ROOM,
                detailRoom: res.data.content
            }
            dispatch(action)
            dispatch(hiddenLoadingAction)
         })
         promise.catch((err) => { 
            console.log(err);
          })
    }
}

//admin
export const listRoomAction = () => {
    return (dispatch2) => {
        dispatch2(loadingAction);
        let promise = roomService.listRoom();
        promise.then((result) => {
            let action2 = {
                type: GET_LIST_ROOM_AD,
                arrRoom: result.data.content,
                
            }
            dispatch2(action2);
            dispatch2(hiddenLoadingAction);
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

export const getRoomAction = (id = '') => {
    return (dispatch2) => {
        let promise = roomService.detailRoom(id);
        promise.then((result) => {
            let action2 = {
                type: GET_DETAIL_ROOM_AD,
                room: result.data.content,
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

export const removeRoomAction = (id = '') => {
    return (dispatch2) => {
        let promise = roomService.removeRoom(id);
        promise.then((result) => {
            let action2 = {
                type: DEL_ROOM,
                arletContent: [result.data.message, 201],
                roomId: id,
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

export const addRoomAction = (room = {}) => {
    return (dispatch2) => {
        let promise = roomService.addRoom(room);
        promise.then((result) => {
            console.log(result)
            let action2 = {
                type: ADD_ROOM,
                addRoom: result.data.content,
                arletContent:  [result.data.message, 200],
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

export const updateRoomAction = (room = {}, id = '') => {
    return (dispatch2) => {
        let promise = roomService.updateRoom(room, id);
        promise.then((result) => {
            let action2 = {
                type: UPDATE_ROOM,
                arletContent: ["Cập nhập phòng thành công", 200],
                updateRoom: result.data.content,
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

export const upImageRoomAction = (file = [], id = '') => {
    return (dispatch2) => {
        let promise = roomService.upImageRoom(file, id);
        promise.then((result) => {
            let action2 = {
                type: UP_IMAGE_ROOM,
                arletContent: ["Cập nhập hình ảnh thành công", 201],
                upImageRoom: result.data.content,
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

export const setAlertRoomAction = (arletContent = []) => {
    return (dispatch2) => {
        let action2 = {
            type: SET_ALERT,
            arletContent: arletContent,
        }
        dispatch2(action2);

    }
}