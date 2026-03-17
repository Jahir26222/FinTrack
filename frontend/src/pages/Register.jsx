import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../store/slices/authSlice';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(register(formData));
        if (register.fulfilled.match(resultAction)) {
            navigate('/dashboard');
        }
    };

    useEffect(() => {
        if (user || isSuccess) {
            navigate('/dashboard');
        }
        // isError check ke time message clean karna ho toh dispatch(reset()) use karein
    }, [user, isSuccess, navigate]);

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
                <h2 className="text-3xl font-bold text-white text-center mb-2">Create Account</h2>
                <p className="text-slate-400 text-center mb-8">Start tracking your wealth today.</p>

                {/* --- Error Message Display Area --- */}
                {isError && (
                    <div className="mb-6 flex items-center gap-2 text-rose-400 bg-rose-400/10 p-3 rounded-lg border border-rose-400/20 text-sm animate-shake">
                        <AlertCircle size={18} />
                        <span>{message || "Registration failed. Try again."}</span>
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-slate-300 mb-2 font-medium">Full Name</label>
                        <input
                            type="text" name="name" value={formData.name} onChange={onChange}
                            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="John Doe" required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 mb-2 font-medium">Email Address</label>
                        <input
                            type="email" name="email" value={formData.email} onChange={onChange}
                            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="john@example.com" required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 mb-2 font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                value={formData.password} 
                                onChange={onChange}
                                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all pr-12"
                                placeholder="••••••••" required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit" disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/25 disabled:opacity-50"
                    >
                        {isLoading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400">
                    Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;