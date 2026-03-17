import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionService from '../../services/transactionService';

const initialState = {
    transactions: [],
    stats: {
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

// Add new transaction
export const addTransaction = createAsyncThunk(
    'transaction/add',
    async (transactionData, thunkAPI) => {
        try {
            return await transactionService.addTransaction(transactionData);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get all transactions
export const getTransactions = createAsyncThunk(
    'transaction/all',
    async (filters, thunkAPI) => {
        try {
            return await transactionService.getAllTransactions(filters);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete transaction
export const deleteTransaction = createAsyncThunk(
    'transaction/delete',
    async (id, thunkAPI) => {
        try {
            return await transactionService.deleteTransaction(id);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get Dashboard Stats (Income, Expense, Balance)
export const getDashboardStats = createAsyncThunk(
    'transaction/stats',
    async (_, thunkAPI) => {
        try {
            return await transactionService.getDashboardStats();
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        resetTransactionState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Get Transactions
            .addCase(getTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions = action.payload.data;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Add Transaction
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions.unshift(action.payload.data);
            })
            // Delete Transaction
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions = state.transactions.filter(
                    (t) => t._id !== action.payload.data._id
                );
            })
            // Get Stats
            .addCase(getDashboardStats.fulfilled, (state, action) => {
                state.stats = action.payload.data;
            });
    },
});

export const { resetTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;