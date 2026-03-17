import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../store/slices/authSlice';
import { Eye, EyeOff, AlertCircle } from 'lucide-react'; // Icons add kiye

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false); // Visibility state
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isSuccess || user) {
            navigate('/dashboard');
        }
        // Error dikhane ke baad state clean karne ke liye reset use kar sakte hain
    }, [user, isSuccess, navigate]);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
                <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h2>
                <p className="text-slate-400 text-center mb-8">Manage your finances with ease.</p>

                {/* --- Error Message Display Area --- */}
                {isError && (
                    <div className="mb-6 flex items-center gap-2 text-rose-400 bg-rose-400/10 p-3 rounded-lg border border-rose-400/20 text-sm animate-shake">
                        <AlertCircle size={18} />
                        <span>{message || "Invalid credentials. Please try again."}</span>
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-slate-300 mb-2">Email Address</label>
                        <input
                            type="email" name="email" value={formData.email} onChange={onChange}
                            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-all"
                            placeholder="name@company.com" required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                value={formData.password} 
                                onChange={onChange}
                                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-all pr-12"
                                placeholder="••••••••" required
                            />
                            {/* Hide/Show Toggle */}
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit" disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                    >
                        {isLoading ? 'Login...' : 'Log In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400">
                    Don't have an account? <Link to="/register" className="text-indigo-400 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;