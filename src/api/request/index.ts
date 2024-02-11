import axios from 'axios';

// export const API_URL = `https://ilineirosbecktesttask.onrender.com/auth`
export const API_URL = `http://localhost:7000/auth`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api;