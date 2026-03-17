import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats, getTransactions } from '../store/slices/transactionSlice';
import { getMe } from '../store/slices/authSlice';
import Navbar from '../components/Navbar';
import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';
import ExpenseChart from '../components/ExpenseChart';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Plus, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    
    // Auth state se user ka naam lene ke liye
    const { user } = useSelector((state) => state.auth); 
    // Transaction state se stats lene ke liye
    const { stats } = useSelector((state) => state.transaction); 

    useEffect(() => {
        // Dashboard load hote hi data fetch karna
        dispatch(getDashboardStats());
        dispatch(getTransactions());
        dispatch(getMe())
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
            <Navbar />
            
            <main className="max-w-7xl mx-auto p-4 md:p-8">
                {/* Header Section: Welcome Message & Add Button */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Welcome back, <span className="text-indigo-400">{user?.name}!</span>
                        </h1>
                        <p className="text-slate-400 mt-2 flex items-center gap-2">
                            <TrendingUp size={16} className="text-emerald-500" />
                            Here's what's happening with your money today.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/25 active:scale-95 group"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                        Add Transaction
                    </button>
                </header>

                {/* Stats Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Total Balance */}
                    <div className="bg-slate-800 p-7 rounded-3xl border border-slate-700 shadow-xl relative overflow-hidden group">
                        <div className="absolute right-0 top-0 h-full w-1.5 bg-indigo-500 group-hover:w-3 transition-all"></div>
                        <p className="text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">Total Balance</p>
                        <h3 className="text-4xl font-black text-white">₹{stats.balance?.toLocaleString('en-IN')}</h3>
                        <div className="mt-5 flex items-center text-indigo-400 text-xs font-bold">
                            <Wallet size={16} className="mr-2" /> SEAMLESS TRACKING
                        </div>
                    </div>

                    {/* Total Income */}
                    <div className="bg-slate-800 p-7 rounded-3xl border border-slate-700 shadow-xl group">
                        <p className="text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">Total Income</p>
                        <h3 className="text-4xl font-black text-emerald-400">₹{stats.totalIncome?.toLocaleString('en-IN')}</h3>
                        <div className="mt-5 flex items-center text-emerald-500 text-xs font-bold">
                            <ArrowUpCircle size={16} className="mr-2" /> TOTAL EARNINGS
                        </div>
                    </div>

                    {/* Total Expense */}
                    <div className="bg-slate-800 p-7 rounded-3xl border border-slate-700 shadow-xl group">
                        <p className="text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">Total Expense</p>
                        <h3 className="text-4xl font-black text-rose-500">₹{stats.totalExpense?.toLocaleString('en-IN')}</h3>
                        <div className="mt-5 flex items-center text-rose-500 text-xs font-bold">
                            <ArrowDownCircle size={16} className="mr-2" /> TOTAL SPENDING
                        </div>
                    </div>
                </div>

                {/* Main Content Layout: Table (Left/Center) & Graph (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Transaction Table */}
                    <div className="lg:col-span-8">
                        <TransactionList />
                    </div>
                    
                    {/* Right Column: Chart & Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <ExpenseChart />
                        
                       
                      
                    </div>
                </div>
            </main>

            {/* Modal Overlay */}
            <AddTransactionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};

export default Dashboard;