import { GET_LIST_LOCATION } from "../type/LocationType"

const initialState = {
    arrayLocation: []
}

export const LocationReducer = (state = initialState, action) => {
    switch (action.type) {
        // lấy ds vị trí 
        case GET_LIST_LOCATION:
            state.arrayLocation = action.arrayLocation
            return { ...state }

        default:
            return state
    }
}
