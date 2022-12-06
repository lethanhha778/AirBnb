import { GET_DETAIL_ROOM, GET_LIST_ROOM } from "../type/RoomType"

const initialState = {
    arrRoom: [],
    detailRoom: {}
}



export const RoomReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_LIST_ROOM:
            state.arrRoom = action.arrRoom
            return { ...state }
        case GET_DETAIL_ROOM:
            state.detailRoom = action.detailRoom
            return {...state}
        default:
            return state
    }
}
