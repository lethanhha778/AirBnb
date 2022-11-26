import { DATA_SEARCH } from "../type/BookingRoomType"


const initialState = {
    dataSearch: {

    }
}

export const BookingReducer = (state = initialState, action) => {
    switch (action.type) {
        // lấy ds vị trí 
        case DATA_SEARCH:
            state.dataSearch = action.dataSearch
            console.log(state.dataSearch)
            return { ...state }

        default:
            return state
    }
}
