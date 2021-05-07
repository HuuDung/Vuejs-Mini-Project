import http from '../http-common';
import authHeader from './AuthHeader';
class ReplyDataService {
    getAll(id, params) {
        return http.get(`/comments/${id}/replies`, { params });
    }
    create(data) {
        return http.post(`/replies`, data, { headers: authHeader() });
    }
}
export default new ReplyDataService();
