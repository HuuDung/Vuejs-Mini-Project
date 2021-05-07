import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.APP_BASE_URL + process.env.APP_BASE_API,
    headers: {
        'Content-type': 'application/json',
    },
});

export default instance;
