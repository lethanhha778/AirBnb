// api bình luận
import { http } from "../util/config";

class CommentServices {
    // user
    getAllComment = () => {
        return http.get(`/api/binh-luan`)
    }
    postCommentUser = (contentComment) => {
        return http.post(`/api/binh-luan`, contentComment)
    }
}
const commentServices = new CommentServices()
export default commentServices
