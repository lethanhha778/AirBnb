import { GET_LIST_ROOM } from "../type/RoomType"

const initialState = {
    arrRoom: [],
}



export const RoomReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_LIST_ROOM:
            state.arrRoom = action.arrRoom
            return { ...state }

        default:
            return state
    }
}
