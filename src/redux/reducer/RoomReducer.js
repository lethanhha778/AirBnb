import { GET_DETAIL_ROOM, GET_LIST_ROOM } from "../type/RoomType"
import { ADD_ROOM, DEL_ROOM, GET_DETAIL_ROOM_AD, GET_LIST_ROOM_AD, SET_ALERT, UPDATE_ROOM, UP_IMAGE_ROOM } from "../type/RoomType";

const initialState = {
    arrRoom: [],
    detailRoom: {},
    room: {},
    pagRoom: {},
    arletContent: ['', 0],

}

export const RoomReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_ROOM:
            state.arrRoom = action.arrRoom
            return { ...state }
        case GET_DETAIL_ROOM:
            state.detailRoom = action.detailRoom
            return { ...state }
        default:
            return state
    }
}

export const roomAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        //admin
        // case GET_LIST_ROOM_AD:
        //     state.arrRoom = action.arrRoom;
        //     return { ...state }

        case GET_LIST_ROOM_AD:
            state.pagRoom = action.pagRoom;
            return { ...state }

        case GET_DETAIL_ROOM_AD:
            state.room = action.room;
            return { ...state }

        case DEL_ROOM:
            state.arletContent = action.arletContent;
            return { ...state }

        case ADD_ROOM:
            state.arletContent = action.arletContent;
            return { ...state }

        case UPDATE_ROOM:
            let indexInfo = state.pagRoom.data.findIndex((room) => room.id === action.updateRoom.id)
            if (indexInfo > -1) {
                state.pagRoom.data[indexInfo] = action.updateRoom
            }
            state.room = action.updateRoom;
            state.arletContent = action.arletContent;
            return { ...state }

        case UP_IMAGE_ROOM:
            let indexImage = state.pagRoom.data.findIndex((room) => room.id === action.upImageRoom.id)
            if (indexImage > -1) {
                state.pagRoom.data[indexImage] = action.upImageRoom;
            }
            state.room = action.upImageRoom;
            state.arletContent = action.arletContent;
            return { ...state }

        case SET_ALERT:
            state.arletContent = action.arletContent;
            return { ...state }

        default:
            return state
    }
}

