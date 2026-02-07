import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { listResumes, deleteResume, getResume } from '../utils/api';
import ResumePreview from '../components/ResumePreview';
import { showToast } from '../utils/toast';
import './pages.css';

const ResumeSelectorPage = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [previewResume, setPreviewResume] = useState(null);
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { signOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const data = await listResumes();
            setResumes(data);
        } catch (error) {
            console.error('Failed to fetch resumes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStartNew = () => {
        navigate('/builder');
    };

    const handleSelectResume = (id) => {
        navigate(`/builder?id=${id}`);
    };

    const handleViewPreview = async (id) => {
        setIsPreviewLoading(true);
        try {
            const data = await getResume(id);
            setPreviewResume(data);
        } catch (error) {
            console.error('Failed to load preview:', error);
            showToast.error('Could not load resume preview.');
        } finally {
            setIsPreviewLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
            showToast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error);
            showToast.error('Failed to logout');
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            await deleteResume(id);
            setResumes(resumes.filter(r => r.id !== id));
            showToast.success('Resume deleted successfully');
        } catch (error) {
            console.error('Failed to delete:', error);
            showToast.error('Failed to delete resume');
        }
    };

    const filteredResumes = resumes.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="page-container">
            <nav className="home-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="nav-logo">
                    <a href="/landing.html">
                        <img src="/logo.png" alt="Future Tech" style={{ height: '50px', width: 'auto' }} />
                    </a>
                </div>
                <div className="nav-links" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
                    <a href="/landing.html#curriculum" className="nav-link">Curriculum</a>
                    <a href="/landing.html#job-support" className="nav-link">Job Support</a>
                    <a href="/landing.html#reviews" className="nav-link">Reviews</a>
                    <a href="/landing.html#pricing" className="nav-link">Fee</a>
                    <a href="/landing.html#faqs" className="nav-link">FAQs</a>
                    <a href="/resumes" className="nav-link" style={{ color: 'var(--primary)', fontWeight: '600' }}>Resume Builder</a>
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setShowProfileMenu(true)}
                        onMouseLeave={() => setShowProfileMenu(false)}
                    >
                        <a
                            href="/profile"
                            className="nav-link"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}
                        >
                            Profile →
                        </a>
                        {showProfileMenu && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '0.5rem',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                minWidth: '150px',
                                zIndex: 1000
                            }}>
                                <a
                                    onClick={handleLogout}
                                    style={{
                                        display: 'block',
                                        padding: '0.75rem 1rem',
                                        color: 'var(--text-main)',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = 'var(--bg-card-hover)'}
                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                >
                                    Logout
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ width: '50px' }}></div> {/* Spacer for balance */}
            </nav>

            <main className="selector-page" style={{ paddingTop: '8rem' }}>
                <header className="selector-header">
                    <h1>How would you like to create this new resume?</h1>
                    <p>Use an existing resume as base or start from your profile information.</p>
                </header>

                <div className="selector-options">
                    <div className="scratch-card" onClick={handleStartNew}>
                        <div className="scratch-info">
                            <h3><span>📝</span> Start From Scratch</h3>
                            <p>Start from your profile information and tailor this resume.</p>
                        </div>
                        <span className="arrow">→</span>
                    </div>

                    <div className="divider">OR</div>

                    <div className="existing-resumes-card">
                        <div className="existing-header">
                            <h3><span>📁</span> Use Existing Resume</h3>
                            <p>A new resume will be created with information prefilled from the selected resume.</p>
                        </div>

                        <div className="search-bar">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading resumes...</div>
                        ) : (
                            <div className="resumes-list">
                                {filteredResumes.length > 0 ? (
                                    filteredResumes.map((resume) => (
                                        <div key={resume.id} className="resume-list-item">
                                            <div className="resume-icon">📄</div>
                                            <div className="resume-item-info">
                                                <div className="resume-item-name">
                                                    {resume.name}
                                                    {resume.is_default && <span className="resume-badge badge-default">Default</span>}
                                                    <span className="resume-badge badge-generated">Generated</span>
                                                </div>
                                                <div className="resume-item-meta">
                                                    Modified: {formatDate(resume.modified_at)}
                                                </div>
                                            </div>
                                            <div className="resume-item-actions">
                                                <button
                                                    className="btn-text btn-small"
                                                    onClick={() => handleViewPreview(resume.id)}
                                                    disabled={isPreviewLoading}
                                                >
                                                    👁️ View
                                                </button>
                                                <button
                                                    className="btn-primary btn-small"
                                                    onClick={() => handleSelectResume(resume.id)}
                                                >
                                                    Select
                                                </button>
                                                <button
                                                    className="btn-text btn-small"
                                                    onClick={(e) => handleDelete(e, resume.id)}
                                                    style={{ color: '#ef4444' }}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                        No resumes found. Start a new one!
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {previewResume && (
                <div className="modal-overlay" onClick={() => setPreviewResume(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Preview: {previewResume.personal_info?.name || 'Untitled'}</h3>
                            <button
                                className="modal-close-btn"
                                onClick={() => setPreviewResume(null)}
                                aria-label="Close"
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-muted)',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = '#ef4444';
                                    e.currentTarget.style.borderColor = '#ef4444';
                                    e.currentTarget.style.transform = 'rotate(90deg)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = 'var(--text-muted)';
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.transform = 'none';
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="preview-container" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                overflow: 'visible',
                                transform: 'scale(0.9)',
                                transformOrigin: 'top center',
                                paddingBottom: '50px'
                            }}>
                                <ResumePreview data={previewResume} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setPreviewResume(null)}>Close</button>
                            <button className="btn-primary" onClick={() => handleSelectResume(previewResume.id)}>Continue Editing</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeSelectorPage;
