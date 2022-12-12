import commentServices from "../../service/CommentService"
import { GET_ALL_COMMENT, POST_COMMENT } from "../type/CommentType"
import { hiddenLoadingAction, loadingAction } from "./LoadingAction"


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

export const postComment = (contentComment) => {
    return (dispatch) => {
        dispatch(loadingAction)
        let promise = commentServices.postCommentUser(contentComment)
        promise.then((res) => {
            console.log(res.data.content)
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