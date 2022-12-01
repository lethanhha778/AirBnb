import { GET_ALL_LOCATION, GET_LIST_LOCATION } from "../type/LocationType"

const initialState = {
    arrayLocation: [],
    allLocation: {

    }

}

export const LocationReducer = (state = initialState, action) => {
    switch (action.type) {
        // lấy ds vị trí 
        case GET_LIST_LOCATION:
            state.arrayLocation = action.arrayLocation
            return { ...state }
        case GET_ALL_LOCATION:
            state.allLocation = action.allLocation
            return { ...state }
        default:
            return state
    }
}
