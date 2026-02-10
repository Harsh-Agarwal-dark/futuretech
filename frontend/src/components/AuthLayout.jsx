import React from 'react';
import '../pages/pages.css';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="auth-split-container">
            {/* Left Panel - Illustration/Brand */}
            <div className="auth-left-panel">
                <img
                    src="/assets/images/login.png"
                    alt="Login Background"
                    className="auth-side-image"
                />
                <div className="auth-overlay">
                    <div className="auth-brand-vertical">
                        Future Tech
                    </div>
                    <p className="auth-brand-tagline">
                        Building the future of your career, one step at a time.
                    </p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="auth-right-panel">
                <div className="auth-content-wrapper">
                    <div className="auth-header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                        <h1 className="auth-welcome-text">{title}</h1>
                        {subtitle && <p className="auth-instruction-text">{subtitle}</p>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
