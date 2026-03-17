import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction, getDashboardStats } from '../store/slices/transactionSlice';
import { X } from 'lucide-react';

const AddTransactionModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        transactionType: 'expense',
        transactionCategory: 'Others',
        description: ''
    });

    const dispatch = useDispatch();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addTransaction(formData));
        dispatch(getDashboardStats()); // Stats update karne ke liye
        onClose(); // Modal close kar do
        setFormData({ title: '', amount: '', transactionType: 'expense', transactionCategory: 'Others', description: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100 p-4">
            <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl">
                <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">Add Transaction</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={24} /></button>
                </div>

                <form onSubmit={onSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Title</label>
                        <input type="text" name="title" required value={formData.title} onChange={onChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none" placeholder="e.g. Dinner" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Amount (₹)</label>
                            <input type="number" name="amount" required value={formData.amount} onChange={onChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm mb-1">Type</label>
                            <select name="transactionType" value={formData.transactionType} onChange={onChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none">
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Category</label>
                        <select name="transactionCategory" value={formData.transactionCategory} onChange={onChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none">
                            <option value="Food">Food</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Rent">Rent</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Salary">Salary</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl mt-4 transition-all shadow-lg shadow-indigo-600/20">
                        Add Record
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionModal;