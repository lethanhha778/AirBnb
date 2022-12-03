import bookingRoomService from "../../service/BookingRoomService";
import { GET_ALL_ROOM, GET_DETAIL_ROOM } from "../type/BookingRoomType";



export const detailRoom = (id) => {
    return (dispatch) => {
        let promise = bookingRoomService.getDetailRoom(id)
        promise.then((res) => {
            const action = {
                type: GET_DETAIL_ROOM,
                room: {
                    dataRoom: res.data.content,
                    idRoom: id
                }
            }
            dispatch(action)
        })
        promise.catch((err) => {
            console.log(err);
        })
    }
}
export const roomList = () => {
    return (dispatch) => {
        let promise = bookingRoomService.getAllRoom()
        promise.then((res) => {
            const action = {
                type: GET_ALL_ROOM,
                arrRoom: res.data.content
            }
            dispatch(action)
        })
        promise.catch((err) => {
            console.log(err);
        })
    }
}