import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { showToast } from '../utils/toast';
import { Lock, Loader2, User } from 'lucide-react';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simple session authentication for admin using env variables
        const ADMIN_USER = import.meta.env.VITE_ADMIN_USER;
        const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

        setTimeout(() => {
            if (username === ADMIN_USER && password === ADMIN_PASS) {
                localStorage.setItem('isAdmin', 'true');
                showToast.success('Admin access granted!');
                navigate('/admin');
            } else {
                showToast.error('Invalid admin credentials');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <AuthLayout title="Admin Login" subtitle="Access the leads dashboard and management tools.">
            <form onSubmit={handleLogin} className="auth-form">
                <div className="modern-form-group">
                    <div className="modern-input-wrapper">
                        <input
                            type="text"
                            className="modern-input"
                            placeholder=" "
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label className="modern-input-label">Username</label>
                        <User size={18} className="modern-input-icon" style={{ opacity: 0.5, marginRight: '1rem' }} />
                    </div>
                </div>

                <div className="modern-form-group">
                    <div className="modern-input-wrapper">
                        <input
                            type="password"
                            className="modern-input"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label className="modern-input-label">Password</label>
                        <Lock size={18} className="modern-input-icon" style={{ opacity: 0.5, marginRight: '1rem' }} />
                    </div>
                </div>

                <div className="auth-actions-row" style={{ justifyContent: 'center', marginTop: '2rem' }}>
                    <button type="submit" className="btn-auth-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Login as Admin'}
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default AdminLoginPage;
