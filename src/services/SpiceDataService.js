import http from '../http-common';

class SpiceDataService {
    getAll() {
        return http.get(`/spices/`);
    }
}

export default new SpiceDataService();
