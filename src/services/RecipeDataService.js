import http from '../http-common';
import authHeader from './AuthHeader';

class RecipeDataService {
    getAll() {
        return http.get('/recipes');
    }

    findOne(id) {
        let headers = authHeader();
        return http.get('/recipes/' + id, { headers: headers });
    }

    createLikeRecipe(id, data) {
        return http.post(`/recipes/${id}/like`, data);
    }

    destroyLikeRecipe(id, data) {
        return http.delete(`/recipes/${id}/like`, { data });
    }

    createRecipe(data) {
        let auth = authHeader();
        return http.post(`/recipes/`, data, {
            headers: {
                'x-access-token': auth['x-access-token'],
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    updateRecipe(id, data) {
        let auth = authHeader();
        return http.put(`/recipes/${id}`, data, {
            headers: {
                'x-access-token': auth['x-access-token'],
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    deleteRecipe(id) {
        let auth = authHeader();
        return http.delete(`/recipes/${id}`, {
            headers: {
                'x-access-token': auth['x-access-token'],
            },
        });
    }
}

export default new RecipeDataService();
