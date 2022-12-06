import bookingRoomService from "../../service/BookingRoomService";
import { GET_ALL_ROOM, } from "../type/BookingRoomType";
import { hiddenLoadingAction, loadingAction } from "./LoadingAction";


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