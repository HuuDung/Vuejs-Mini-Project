import http from '../http-common';

class UserService {
    getAll(params) {
        return http.get('/users', { params: params });
    }

    delete(id) {
        return http.delete('/users/' + id);
    }
}

export default new UserService();
