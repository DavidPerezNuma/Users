import axios from 'axios';


const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    Headers : {
        'Content-Type': 'application/json'
    }   
});

api.interceptors.request.use(
    (config) => config,
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

export default api;
