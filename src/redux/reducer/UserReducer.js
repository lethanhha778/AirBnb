import { ADD_USER, DEL_USER, GET_DETAIL_USER, GET_LIST_PAGE_USER, GET_LIST_USER, GET_SEARCH_USER, SET_ALERT, UPDATE_USER, UP_IMAGE_USER } from "../type/UserType";

const initialState = {
    arrUser: [],
    user: {},
    pagUser:{},
    arletContent: ['', 0],
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        //admin
        case GET_LIST_USER:
            state.arrUser = action.arrUser;
            return { ...state }

        case GET_LIST_PAGE_USER:
            state.pagUser = action.pagUser;
            return { ...state }

        case GET_DETAIL_USER:
            state.user = action.user;
            return { ...state }

        case DEL_USER:
            state.arletContent = action.arletContent;
            return { ...state }

        case ADD_USER:
            state.arletContent = action.arletContent;
            return { ...state }

        case UPDATE_USER:
            state.arletContent = action.arletContent;
            return { ...state }

        case GET_SEARCH_USER:
            state.pagUser.pageIndex = action.pagination.current;
            state.pagUser.pageSize = action.pagination.pageSize;
            state.pagUser.data = action.searchUser;
            state.pagUser.totalRow = action.searchUser.length;
            return { ...state }

        case UP_IMAGE_USER:
            let indexImage = state.pagUser.data.findIndex((user) => user.id === action.upImageUser.id)
            if (indexImage > -1) {
                state.pagUser.data[indexImage] = action.upImageUser;
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