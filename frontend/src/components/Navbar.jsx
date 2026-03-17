import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout, reset } from '../store/slices/authSlice';
import { LogOut, LayoutDashboard, CreditCard } from 'lucide-react';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <nav className="bg-slate-800 border-b border-slate-700 px-4 py-3 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <CreditCard className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">FinTrack</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-4 text-slate-300">
                       
                    </div>

                    <div className="h-6 w-px bg-slate-700 hidden md:block"></div>

                    <div className="flex items-center gap-3">
                        {/* <span className="text-md font-medium text-slate-200 hidden sm:block">
                            {user?.name}
                        </span> */}
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 cursor-pointer bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 px-3 py-1.5 rounded-lg transition-all text-sm font-semibold"
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;