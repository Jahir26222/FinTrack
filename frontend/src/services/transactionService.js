import api from '../api/api';

const addTransaction = async (data) => {
    const response = await api.post('/transaction/add', data);
    return response.data;
};

const getAllTransactions = async (filters = "") => {
    // filters mein hum query params bhej sakte hain (e.g., ?type=expense)
    const response = await api.get(`/transaction/all${filters}`);
    return response.data;
};

const deleteTransaction = async (id) => {
    const response = await api.delete(`/transaction/delete/${id}`);
    return response.data;
};

// Jo naya stats wala route humne discuss kiya tha
const getDashboardStats = async () => {
    const response = await api.get('/transaction/stats');
    return response.data;
};

const transactionService = {
    addTransaction,
    getAllTransactions,
    deleteTransaction,
    getDashboardStats,
};

export default transactionService;