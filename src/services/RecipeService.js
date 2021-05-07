import http from '../http-common';
import authHeader from './AuthHeader';

class RecipeService {
    getAll(params) {
        let headers = authHeader();
        return http.get('/recipes', {
            headers: headers,
            params: params,
        });
    }

    getRanking() {
        let headers = authHeader();
        return http.get('/recipes/ranking', { headers: headers });
    }

    getListWithSearchKey(params) {
        return http.get('/recipes/search', {
            params: params,
        });
    }

    changeStatus(id) {
        return http.delete('/recipes/status/' + id);
    }

    delete(id) {
        return http.delete('/recipes/' + id);
    }

    getTotalRecipe(params) {
        let headers = authHeader();
        return http.get('/recipes/totalRecipe', {
            headers: headers,
            params: params,
        });
    }

    getLikeStatus(params) {
        let headers = authHeader();
        return http.get('recipes/like-status', { headers: headers, params: params });
    }

    toggleLike(id) {
        let headers = authHeader();
        return http.delete('/recipes/' + id + '/toggle-like', { headers: headers });
    }
}

export default new RecipeService();
