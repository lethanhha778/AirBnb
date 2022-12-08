<<<<<<< HEAD
import { ADD_LOCATION, DEL_LOCATION, GET_DETAIL_LOCATION, GET_LIST_LOCATION, SET_ALERT, UPDATE_LOCATION, UP_IMAGE_LOCATION } from "../type/LocationType";


const initialState = {
    arrLocation: [],
    location: {},
    arletContent: '',
}

export const locationReducer = (state = initialState, action) => {
    switch (action.type) {

        //admin
        case GET_LIST_LOCATION:
            state.arrLocation = action.arrLocation;
            return { ...state }

        case GET_DETAIL_LOCATION:
            state.location = action.location;
            return { ...state }

        case DEL_LOCATION:
            state.arrLocation = state.arrLocation.filter(item => item.id !== action.locationId)
            state.arletContent = action.arletContent;
            return { ...state }

        case ADD_LOCATION:
            state.arrLocation = [...state.arrLocation, action.addLocation]
            state.arletContent = action.arletContent;
            return { ...state }

        case UPDATE_LOCATION:
            let indexInfo = state.arrLocation.findIndex((location) => location.id === action.updateLocation.id)
            if (indexInfo > -1) {
                state.arrLocation[indexInfo] = action.updateLocation
            }
            state.arletContent = action.arletContent;
            return { ...state }

        case UP_IMAGE_LOCATION:
            let indexImage = state.arrLocation.findIndex((location) => location.id === action.upImageLocation.id)
            if (indexImage > -1) {
                state.arrLocation[indexImage] = action.upImageLocation
            }
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
            console.log(state.allLocation)
            return { ...state }
        default:
            return state
    }
}
>>>>>>> main
