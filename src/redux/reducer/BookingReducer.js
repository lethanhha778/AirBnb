import { DATA_SEARCH, GET_ALL_ROOM, } from "../type/BookingRoomType"


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

        default:
            return state
    }
}
