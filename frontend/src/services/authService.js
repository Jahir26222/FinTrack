import api from '../api/api';

const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

const login = async (userData) => {
    const response = await api.post('/auth/login', userData);
    return response.data;
};

const getMe = async () => {
    const response = await api.get('/auth/get-me');
    return response.data;
};

const logout = async () => {
    const response = await api.get('/auth/logout'); // Backend mein logout route hona chahiye
    return response.data;
};

const authService = {
    register,
    login,
    getMe,
    logout,
};

export default authService;