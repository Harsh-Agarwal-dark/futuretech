import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { showToast } from '../utils/toast';
import { UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react';

const SignupPage = () => {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    }
                }
            });
            if (error) throw error;
            showToast.success('Account created! Please check your email for verification.');
            navigate('/login');
        } catch (error) {
            showToast.error(error.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Create Account" subtitle="Join to unlock the full potential of Future Tech">
            <form onSubmit={handleSignup} className="auth-form">
                <div className="modern-form-group">
                    <div className="modern-input-wrapper">
                        {/* <User size={20} className="modern-input-icon" /> */}
                        <input
                            type="text"
                            className="modern-input"
                            placeholder=" "
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <label className="modern-input-label">Full Name</label>
                    </div>
                </div>

                <div className="modern-form-group">
                    <div className="modern-input-wrapper">
                        {/* <Mail size={20} className="modern-input-icon" /> */}
                        <input
                            type="email"
                            className="modern-input"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="modern-input-label">Email Address</label>
                    </div>
                </div>

                <div className="modern-form-group">
                    <div className="modern-input-wrapper">
                        {/* <Lock size={20} className="modern-input-icon" /> */}
                        <input
                            type="password"
                            className="modern-input"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                        <label className="modern-input-label">Password</label>
                    </div>
                </div>

                <div className="auth-actions-row">
                    <button type="submit" className="btn-auth-primary" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign Up'}
                    </button>
                    <Link to="/login" className="btn-create-account">
                        Login
                    </Link>
                </div>

                <div className="social-login-section">
                    <div className="social-label">Or join with</div>
                    <div className="social-buttons">
                        <button type="button" className="social-btn google-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.9125 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.9315 10.675 21.8055 10.0415Z" fill="#FFC107" />
                                <path d="M3.15295 7.3455L6.4385 9.755C7.3275 7.554 9.4805 6 12 6C13.5295 6 14.9125 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.1585 2 4.828 4.1685 3.15295 7.3455Z" fill="#FF3D00" />
                                <path d="M12 22C14.666 22 17.0545 20.9455 18.841 19.2945L15.655 16.716C14.639 17.545 13.3615 17.9995 12 18C9.3885 18 7.173 16.3285 6.3485 14H3.0535V16.5365C4.7225 19.7825 8.083 22 12 22Z" fill="#4CAF50" />
                                <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.257 15.108 16.546 16.0765 15.655 16.716L18.841 19.2945C20.7275 17.545 21.8055 15.0135 21.8055 12C21.8055 11.3295 21.9315 10.675 21.8055 10.0415Z" fill="#1976D2" />
                            </svg>
                        </button>
                        <button type="button" className="social-btn facebook-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="#1877F2" />
                            </svg>
                        </button>
                        <button type="button" className="social-btn twitter-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 4.01C21.2 4.5 20.3 4.8 19.5 5.1C20.37 4.5 20.97 3.6 21.25 2.6C20.45 3.09 19.55 3.4 18.55 3.6C17.75 2.7 16.6 2.2 15.4 2.2C13.04 2.2 11.23 4.19 11.23 6.64C11.23 6.94 11.24 7.25 11.34 7.52C7.96 7.37 4.89 5.67 2.85 3.06C2.55 3.62 2.37 4.25 2.37 4.94C2.37 6.46 3.12 7.78 4.25 8.56C3.59 8.54 2.94 8.35 2.4 8.04V8.08C2.4 10.21 3.88 11.96 5.8 12.38C5.43 12.48 5.06 12.53 4.67 12.53C4.4 12.53 4.13 12.49 3.86 12.45C4.4 14.21 5.99 15.47 7.9 15.5C6.38 16.71 4.5 17.41 2.5 17.41C2.12 17.41 1.77 17.39 1.45 17.33C3.37 18.58 5.66 19.3 8.13 19.3C16.14 19.3 20.53 12.56 20.53 6.72C20.53 6.54 20.52 6.35 20.52 6.16C21.36 5.54 21.1 5.03 21.75 4.3V4.01" fill="#1DA1F2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};

export default SignupPage;
