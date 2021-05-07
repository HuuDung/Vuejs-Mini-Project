import http from '../http-common';
import authHeader from './AuthHeader';
class CommentDataService {
    getAll(id, params) {
        return http.get(`/recipes/${id}/comments`, { params, headers: authHeader() });
    }
    create(data) {
        return http.post(`/comments`, data, { headers: authHeader() });
    }
    toggleLike(id) {
        let headers = authHeader();
        return http.delete('/comments/' + id + '/toggle-like', { headers: headers });
    }
}

export default new CommentDataService();
