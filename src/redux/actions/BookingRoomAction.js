import { GET_ALL_ROOM, } from "../type/BookingRoomType";
import { hiddenLoadingAction, loadingAction } from "./LoadingAction";
import bookingRoomService from "../../service/BookingRoomService";
import { ADD_BOOKING, DEL_BOOKING, GET_DETAIL_BOOKING_AD, GET_LIST_BOOKING_AD, SET_ALERT, UPDATE_BOOKING } from "../type/BookingRoomType";

export const roomList = () => {
    return (dispatch) => {
        dispatch(loadingAction)
        let promise = bookingRoomService.getAllRoom()
        promise.then((res) => {
            const action = {
                type: GET_ALL_ROOM,
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

//admin
export const listBookingAction = () => {
    return (dispatch2) => {
        let promise = bookingRoomService.listBooking();
        promise.then((result) => {
            let action2 = {
                type: GET_LIST_BOOKING_AD,
                arrBooking: result.data.content,
            }
            dispatch2(action2)
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

export const getBookingAction = (id = '') => {
    return (dispatch2) => {
        let promise = bookingRoomService.detailBooking(id);
        promise.then((result) => {
            let action2 = {
                type: GET_DETAIL_BOOKING_AD,
                booking: result.data.content,
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

export const removeBookingAction = (id = '') => {
    return (dispatch2) => {
        let promise = bookingRoomService.removeBooking(id);
        promise.then((result) => {
            let action2 = {
                type: DEL_BOOKING,
                bookingId: id,
                arletContent: [result.data.message, 201],
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

export const addBookingAction = (booking = {}) => {
    return (dispatch2) => {
        let promise = bookingRoomService.addBooking(booking);
        promise.then((result) => {
            let action2 = {
                type: ADD_BOOKING,
                addBooking: result.data.content,
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

export const updateBookingAction = (booking = {}, id = '') => {
    return (dispatch2) => {
        let promise = bookingRoomService.updateBooking(booking, id);
        promise.then((result) => {
            let action2 = {
                type: UPDATE_BOOKING,
                updateBooking: result.data.content,
                arletContent: ["Cập nhập đặt phòng thành công", 200],
            }
            dispatch2(action2)
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

export const setAlertBookingAction = (arletContent = []) => {
    return (dispatch2) => {
        let action2 = {
            type: SET_ALERT,
            arletContent: arletContent,
        }
        dispatch2(action2);
    }
}
