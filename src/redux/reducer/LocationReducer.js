import { GET_LIST_LOCATION } from "../type/LocationType"

const initialState = {
    arryLocation: []
}

export const LocationReducer = (state = initialState, action) => {
    switch (action.type) {
        // lấy ds vị trí 
        case GET_LIST_LOCATION:
            state.arryLocation = action.arryLocation
            return { ...state }

        default:
            return state
    }
}
