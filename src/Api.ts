import axios from 'axios';
import { tokenGetter } from './helpers/token';

const local = 'http://0.0.0.0:8000/';
const prod = process.env.REACT_APP_API_URL;
const apiUrl = process.env.REACT_APP_STAGE === 'production' ? prod : local;

const http = axios.create({
    baseURL: apiUrl,
    headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
    (config) => {
        const token = tokenGetter();
        if (token) {
            config!.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const {get, post} = http;
export {get, post};