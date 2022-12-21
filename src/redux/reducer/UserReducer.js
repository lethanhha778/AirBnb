import { ADD_USER, DEL_USER, GET_DETAIL_USER, GET_LIST_USER, GET_SEARCH_USER, SET_ALERT, UPDATE_USER, UP_IMAGE_USER } from "../type/UserType";

const initialState = {
    arrUser: [],
    user: {},
    arletContent: ['', 0],
}

export const userAdminReducer = (state = initialState, action) => {
    switch (action.type) {

        //admin
        case GET_LIST_USER:
            state.arrUser = action.arrUser;
            return { ...state }

        case GET_DETAIL_USER:
            state.user = action.user;
            return { ...state }

        case DEL_USER:
            state.arrUser = state.arrUser.filter(item => item.id !== action.userId)
            state.arletContent = action.arletContent;
            return { ...state }

        case ADD_USER:
            state.arletContent = action.arletContent;
            return { ...state }

        case UPDATE_USER:
            state.arletContent = action.arletContent;
            return { ...state }

        case GET_SEARCH_USER:
            state.arrUser = action.arrUser;
            return { ...state }

        case UP_IMAGE_USER:
            let indexImage = state.arrUser.findIndex((user) => user.id === action.upImageUser.id)
            if (indexImage > -1) {
                state.arrUser[indexImage] = action.upImageUser;
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