// api bình luận
import { http } from "../util/config";

class CommentService {
    

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

const commentService = new CommentService()
export default commentService