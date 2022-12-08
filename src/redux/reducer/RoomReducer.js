<<<<<<< HEAD
import { ADD_ROOM, DEL_ROOM, GET_DETAIL_ROOM, GET_LIST_ROOM, SET_ALERT, UPDATE_ROOM, UP_IMAGE_ROOM } from "../type/RoomType";

const initialState = {
    arrRoom: [],
    room: {},
    arletContent: '',
}

export const roomReducer = (state = initialState, action) => {
    switch (action.type) {

        //admin
        case GET_LIST_ROOM:
            state.arrRoom = action.arrRoom;
            return { ...state }

        case GET_DETAIL_ROOM:
            state.room = action.room;
            return { ...state }

        case DEL_ROOM:
            state.arrRoom = state.arrRoom.filter(item => item.id !== action.roomId)
            state.arletContent = action.arletContent;
            return { ...state }

        case ADD_ROOM:
            state.arrRoom = [...state.arrRoom, action.addRoom];
            state.arletContent = action.arletContent;

            return { ...state }

        case UPDATE_ROOM:
            let indexInfo = state.arrRoom.findIndex((room) => room.id === action.updateRoom.id)
            if (indexInfo > -1) {
                state.arrRoom[indexInfo] = action.updateRoom
            }
            state.room = action.updateRoom;
            state.arletContent = action.arletContent;
            return { ...state }

        case UP_IMAGE_ROOM:
            let indexImage = state.arrRoom.findIndex((room) => room.id === action.upImageRoom.id)
            if (indexImage > -1) {
                state.arrRoom[indexImage] = action.upImageRoom;
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
=======
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
>>>>>>> main
