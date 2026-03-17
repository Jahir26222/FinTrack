import axios from 'axios';

// Axios instance with a shorter name 'api'
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Apne backend port ke hisab se change kar lena
    withCredentials: true, // Cookies (JWT) ko har request ke saath bhejne ke liye zaroori hai
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;