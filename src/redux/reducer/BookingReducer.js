import { dataIMG } from "../../components/CardRoom/dataImg"
import { DATA_SEARCH, GET_ALL_ROOM, GET_DETAIL_ROOM } from "../type/BookingRoomType"


const initialState = {
    dataSearch: {

    },
    arrRoom: []
}

export const BookingReducer = (state = initialState, action) => {
    switch (action.type) {
        // lấy ds vị trí 
        case DATA_SEARCH:
            state.dataSearch = action.dataSearch
            // console.log(state.dataSearch)
            return { ...state }
        case GET_ALL_ROOM:
            state.arrRoom = action.arrRoom
            return {...state}
        // case GET_DETAIL_ROOM:
        //     state.room = action.room.dataRoom
        //     // console.log(action.room.idRoom);
        //     // console.log(dataIMG[action.room.idRoom])
        //     // cần id
        //     state.room = {...state.room, data:dataIMG[action.room.idRoom]}
        //     console.log('room',state.room)
        //     return { ...state }
        default:
            return state
    }
}
