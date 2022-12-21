import commentServices from "../../service/CommentService";
import { ADD_COMMENT, DEL_COMMENT, GET_DETAIL_COMMENT_AD, GET_LIST_COMMENT_AD, SET_ALERT, UPDATE_COMMENT } from "../type/CommentType";
import { GET_ALL_COMMENT, POST_COMMENT } from "../type/CommentType"
import { hiddenLoadingAction, loadingAction } from "./LoadingAction"


export const postComment = (contentComment) => {
    return (dispatch) => {
        dispatch(loadingAction)
        let promise = commentServices.postCommentUser(contentComment)
        promise.then((res) => {
            const action = {
                type: POST_COMMENT,
                data: res.data.content
            }
            dispatch(action)
            dispatch(hiddenLoadingAction)
        })
        promise.catch((err) => {
            console.log(err)
        })
    }
}

export const getComment = () => {
    return (dispatch) => {
        let promise = commentServices.getAllComment()
        promise.then((res) => {
            const action = {
                type: GET_ALL_COMMENT,
                listComment: res.data.content
            }
            dispatch(action)
        })
        promise.catch((err) => {
            console.log(err)
        })
    }
}

//admin
export const listCommentAction = () => {
    return (dispatch2) => {
        let promise = commentServices.listComment();
        promise.then((result) => {
            let action2 = {
                type: GET_LIST_COMMENT_AD,
                arrComment: result.data.content,
            }
            dispatch2(action2)
        });
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: [error.response?.data.content, error.response?.data.statusCode],
            }
            dispatch2(action2);
        });
    }
}

export const getCommentAction = (id = '') => {
    return (dispatch2) => {
        let action2 = {
            type: GET_DETAIL_COMMENT_AD,
            commentId: id,
        }
        dispatch2(action2); 
    }
}

export const removeCommentAction = (id = '') => {
    return (dispatch2) => {
        let promise = commentServices.removeComment(id);
        promise.then((result) => {
            let action2 = {
                type: DEL_COMMENT,
                commentId: id,
                arletContent: [result.data.message, 201],
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: [error.response?.data.content, error.response?.data.statusCode],
            }
            dispatch2(action2);
        })
    }
}

export const addCommentAction = (comment = {}) => {
    return (dispatch2) => {
        let promise = commentServices.addComment(comment);
        promise.then((result) => {
            let action2 = {
                type: ADD_COMMENT,
                addComment: result.data.content,
                arletContent:  [result.data.message, 200],
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: [error.response?.data.content, error.response?.data.statusCode],
            }
            dispatch2(action2);
        })
    }
}

export const updateCommentAction = (comment = {}, id = '') => {
    return (dispatch2) => {
        let promise = commentServices.updateComment(comment, id);
        promise.then((result) => {
            let action2 = {
                type: UPDATE_COMMENT,
                updateComment: result.data.content,
                arletContent: ["Cập nhập bình luận thành công", 200],
            }
            dispatch2(action2)
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: [error.response?.data.content, error.response?.data.statusCode],
            }
            dispatch2(action2);
        })
    }
}

export const setAlertCommentAction = (arletContent = []) => {
    return (dispatch2) => {
        let action2 = {
            type: SET_ALERT,
            arletContent: arletContent,
        }
        dispatch2(action2);
    }

}