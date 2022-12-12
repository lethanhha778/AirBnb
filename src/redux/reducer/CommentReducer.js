import { GET_ALL_COMMENT, POST_COMMENT } from "../type/CommentType"

const initialState = {
    arrComment: [],
}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENT:
            state.arrComment = action.listComment
            return { ...state }
        case POST_COMMENT:
            console.log(action.data)
            state.arrComment = [...state.arrComment, action.data]
            console.log(state.arrComment);
            return { ...state }
        default:
            return state
    }
}
