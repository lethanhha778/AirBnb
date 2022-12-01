import roomService from "../../service/RoomService";
import { GET_LIST_ROOM } from "../type/RoomType";



export const getAllRoom =(id)=>{
    return (dispatch)=>{
        let promise = roomService.getRoomList(id)
        promise.then((res) => { 
            console.log(res.data.content)
            const action ={
                type:GET_LIST_ROOM,
                arrRoom: res.data.content
            }
            dispatch(action)
         })
         promise.catch((err) => { 
            console.log(err);
          })
    }
}