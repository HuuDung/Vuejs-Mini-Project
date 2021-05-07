import axios from 'axios';

const API_URL = process.env.APP_BASE_URL + process.env.APP_BASE_API;

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                email: user.email,
                password: user.password,
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            name: user.name,
            email: user.email,
            password: user.password,
        });
    }

    refreshToken() {
        const user = JSON.parse(localStorage.getItem('user'));
        let headers = {
            'x-access-token': user.accessToken,
        };
        return axios.get(API_URL + 'refresh-token', { headers: headers });
    }
}

export default new AuthService();
