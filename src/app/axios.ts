import axios from 'axios';

const instance = axios.create({
    baseURL: window.API_BASE_URL,
});

axios.defaults.headers.post['Content-Type'] = 'application/json';

const reqInterceptor = axios.interceptors.request.use(
    request => {
        console.log('[INTERCEPTOR_REQUEST]:', request);
        return request;
    },
    error => {
        console.log('[INTERCEPTOR_REQUEST][ERROR]:', error);
        return Promise.reject(error);
    },
); // only for errors that request sending failed. For respond error use next

axios.interceptors.request.eject(reqInterceptor);

const respInterceptor = axios.interceptors.response.use(
    response => {
        console.log('[INTERCEPTOR_RESPONSE]:', response);
        return response;
    },
    error => {
        console.log('[INTERCEPTOR_RESPONSE][ERROR]:', error);
        return Promise.reject(error);
    },
);

axios.interceptors.response.eject(respInterceptor);

export const CancelToken = axios.CancelToken;

export default instance;
