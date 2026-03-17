import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// getDashboardStats ko import kiya taaki stats update ho sakein
import { deleteTransaction, getDashboardStats } from '../store/slices/transactionSlice';
import { Trash2, Utensils, ShoppingBag, Home, Coffee, CreditCard, Banknote } from 'lucide-react';

const TransactionList = () => {
    const { transactions } = useSelector((state) => state.transaction);
    const dispatch = useDispatch();

    // Delete handler jo delete ke baad stats ko refresh karega
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            const result = await dispatch(deleteTransaction(id));
            
            // Agar delete successfully complete ho gaya (Redux Toolkit fulfilled)
            if (result.meta.requestStatus === 'fulfilled') {
                // Turant naye stats mangwao taaki Dashboard cards update ho jayein
                dispatch(getDashboardStats());
            }
        }
    };

    const categoryIcons = {
        Food: <Utensils size={16} className="text-orange-400" />,
        Shopping: <ShoppingBag size={16} className="text-purple-400" />,
        Rent: <Home size={16} className="text-blue-400" />,
        Entertainment: <Coffee size={16} className="text-pink-400" />,
        Salary: <Banknote size={16} className="text-emerald-400" />,
        Others: <CreditCard size={16} className="text-slate-400" />
    };

    return (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white tracking-tight">Recent Activity</h3>
            </div>
            
            <div className="overflow-x-auto overflow-y-hidden">
                <table className="w-full text-left min-w-125">
                    <colgroup>
                        <col style={{ width: '40%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '10%' }} />
                    </colgroup>
                    <thead className="bg-slate-700/30 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                        <tr>
                            <th className="pl-6 py-4">Description</th>
                            <th className="px-4 py-4">Category</th>
                            <th className="px-4 py-4 text-center">Amount</th>
                            <th className="pr-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {transactions && transactions.map((t) => (
                            <tr key={t._id} className="hover:bg-slate-700/20 transition-all duration-200 group">
                                <td className="pl-6 py-4">
                                    <p className="font-semibold text-slate-200 text-md capitalize truncate max-w-30 md:max-w-50">{t.title}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">{new Date(t.date).toLocaleDateString('en-GB')}</p>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/40 rounded-full w-fit border border-slate-700/50">
                                        {categoryIcons[t.transactionCategory] || categoryIcons.Others}
                                        <span className="text-[10px] font-medium text-slate-300">{t.transactionCategory}</span>
                                    </div>
                                </td>
                                <td className={`px-4 py-4 font-bold text-center text-sm ${t.transactionType === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {t.transactionType === 'income' ? '+' : '-'} ₹{t.amount?.toLocaleString('en-IN')}
                                </td>
                                <td className="pr-6 py-4 text-right">
                                    <button 
                                        onClick={() => handleDelete(t._id)}
                                        className="p-2 cursor-pointer text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {(!transactions || transactions.length === 0) && (
                    <div className="py-16 text-center text-slate-500 text-sm italic">No data available.</div>
                )}
            </div>
        </div>
    );
};

export default TransactionList;