import { http } from "../util/config";
// api bình luận

class CommentServices {
    // user
    getAllComment = () => {
        return http.get(`/api/binh-luan`)
    }
    postCommentUser = (contentComment) => {
        return http.post(`/api/binh-luan`, contentComment)
    }

     //admin
     listComment = () => {
        return http.get(`/api/binh-luan`)
    }

    removeComment= (id) => {
        return http.delete(`/api/binh-luan/${id}`)
    }

    addComment = (comment) => {
        return http.post(`/api/binh-luan`, comment);
    }

    updateComment = (comment, id) => {
        return http.put(`/api/binh-luan/${id}`, comment);
    }
}
const commentServices = new CommentServices()
export default commentServices
