import { ADD_COMMENT, DEL_COMMENT, GET_DETAIL_COMMENT_AD, GET_LIST_COMMENT_AD, SET_ALERT, UPDATE_COMMENT } from "../type/CommentType";

const initialState = {
    arrComment: [],
    comment: {},
    arletContent: ['', 0],
}

export const commentAdminReducer = (state = initialState, action) => {

    //admin
    switch (action.type) {
        case GET_LIST_COMMENT_AD:
            state.arrComment = action.arrComment;
            return { ...state }

        case GET_DETAIL_COMMENT_AD:
            let indexDet = state.arrComment.findIndex((comment) => comment.id == action.commentId);
            console.log(action.commentId, state.arrComment, indexDet)
            if (indexDet > -1) {
                state.comment = state.arrComment[indexDet];
            }
            
            return { ...state }

        case DEL_COMMENT:
            state.arrComment = state.arrComment.filter(item => item.id !== action.commentId);
            state.arletContent = action.arletContent;
            return { ...state }

        case ADD_COMMENT:
            console.log(action.addComment, action.arletContent )
            state.arrComment = [...state.arrComment, action.addComment];
            state.arletContent = action.arletContent;
            return { ...state }

        case UPDATE_COMMENT:
            let indexInfo = state.arrComment.findIndex((comment) => comment.id === action.updateComment.id);
            if (indexInfo > -1) {
                state.arrComment[indexInfo] = action.updateComment;
            }
            state.comment = action.updateComment;
            state.arletContent = action.arletContent;
            return { ...state }

        case SET_ALERT:
            state.arletContent = action.arletContent;
            return { ...state }

        default:
            return state
    }
}