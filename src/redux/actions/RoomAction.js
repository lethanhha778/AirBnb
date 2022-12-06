import roomService from "../../service/RoomService";
import { GET_DETAIL_ROOM, GET_LIST_ROOM } from "../type/RoomType";
import { hiddenLoadingAction, loadingAction } from "./LoadingAction";


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