import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import { showToast } from '../utils/toast';
import ProfileForm from '../components/ProfileForm';
import ListSectionForm from '../components/ListSectionForm';
import { useState, useEffect } from 'react';
import './pages.css';

const ProfilePage = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Initial State Structure similar to Resume Builder
    const [profileData, setProfileData] = useState({
        personal_info: {
            name: user?.name || '',
            email: user?.email || '',
            phone: '',
            linkedin: '',
            github: '',
            location: '',
            website: '',
            summary: ''
        },
        education: [],
        experience: [],
        projects: [],
        skills: [] // Added skills array
    });

    // Clear potential stale local storage on component mount if structure doesn't match
    useEffect(() => {
        const saved = localStorage.getItem('user_profile_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (!Array.isArray(parsed.skills)) {
                    // Stale data detected, clear it
                    localStorage.removeItem('user_profile_data');
                }
            } catch (e) {
                localStorage.removeItem('user_profile_data');
            }
        }
    }, []);

    // Fetch profile data on mount
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.id) return;
            try {
                const response = await fetch(`http://localhost:8000/api/profile/${user.id}`);
                const result = await response.json();

                if (result.status === 'success' && result.profile_data) {
                    setProfileData(result.profile_data);
                } else {
                    // Fallback to local storage if API returns nothing (optional, or just keep default)
                    const savedProfile = localStorage.getItem('user_profile_data');
                    if (savedProfile) setProfileData(JSON.parse(savedProfile));
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                // Fallback
                const savedProfile = localStorage.getItem('user_profile_data');
                if (savedProfile) setProfileData(JSON.parse(savedProfile));
            }
        };
        fetchProfile();
    }, [user?.id]);

    const handleProfileChange = (section, data) => {
        setProfileData(prev => ({
            ...prev,
            personal_info: data
        }));
    };

    const handleSectionChange = (section, data) => {
        setProfileData(prev => ({
            ...prev,
            [section]: data
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Save to Backend
            const response = await fetch('http://localhost:8000/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    profile_data: profileData
                }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            // Also save to local storage as backup/cache
            localStorage.setItem('user_profile_data', JSON.stringify(profileData));

            setTimeout(() => {
                showToast.success('Profile saved to cloud successfully!');
                setLoading(false);
            }, 800);
        } catch (error) {
            console.error('Save failed:', error);
            showToast.error('Failed to save profile to cloud');
            setLoading(false);
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

    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setProfileData(prev => ({
                ...prev,
                skills: [...(prev.skills || []), newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (indexToRemove) => {
        setProfileData(prev => ({
            ...prev,
            skills: (prev.skills || []).filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    // Template structures for new items
    const educationTemplate = {
        institution: '',
        degree: '',
        start_date: '',
        end_date: '',
        gpa: '',
        location: ''
    };

    const experienceTemplate = {
        company: '',
        role: '',
        start_date: '',
        end_date: '',
        location: '',
        details: []
    };

    const projectTemplate = {
        name: '',
        technologies: '',
        link: '',
        details: []
    };

    return (
        <div className="page-container profile-container">
            <header className="selector-header" style={{ marginBottom: '2rem' }}>
                <h1>My Profile</h1>
            </header>

            <div className="profile-card profile-grid">
                {/* Left Column: Avatar & Personal Info */}
                <div className="profile-left-col">
                    <div className="profile-avatar-large">
                        {user?.email?.[0]?.toUpperCase() || <User size={64} />}
                    </div>
                    {/* Upload Photo Button Removed */}

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <ProfileForm
                            data={profileData.personal_info}
                            onChange={(section, data) => handleProfileChange(section, data)}
                        />
                    </div>

                    <button
                        className="btn-save-gold"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>

                    <button
                        className="btn-secondary"
                        onClick={handleLogout}
                        style={{ width: '100%', marginTop: '1rem', borderColor: '#ef4444', color: '#ef4444' }}
                    >
                        <LogOut size={16} style={{ marginRight: '0.5rem' }} />
                        Sign Out
                    </button>
                </div>

                {/* Right Column: Skills & Experience */}
                <div className="profile-right-col">
                    <h3 className="section-title">Skills</h3>

                    {/* Dynamic Skills Section */}
                    <div className="skills-section" style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Add technical skill..."
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    background: 'var(--bg-input)'
                                }}
                            />
                            <button
                                className="btn-primary"
                                onClick={handleAddSkill}
                                style={{ padding: '0 1.5rem', borderRadius: '8px' }}
                            >
                                Add
                            </button>
                        </div>

                        <div className="skills-grid">
                            {(profileData.skills || []).map((skill, index) => (
                                <div key={index} className={`skill-pill ${index % 2 === 0 ? 'teal' : 'gold'}`} style={{ position: 'relative', paddingRight: '2rem' }}>
                                    {skill}
                                    <button
                                        onClick={() => handleRemoveSkill(index)}
                                        style={{
                                            position: 'absolute',
                                            right: '5px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'white',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            opacity: 0.8
                                        }}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            {(!profileData.skills || profileData.skills.length === 0) && (
                                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No skills added yet.</span>
                            )}
                        </div>
                    </div>

                    <hr style={{ borderColor: 'var(--border)', margin: '2rem 0', opacity: 0.5 }} />

                    <h3 className="section-title" style={{ fontSize: '1.1rem' }}>Work History</h3>
                    <ListSectionForm
                        title=""
                        section="experience"
                        data={profileData.experience}
                        onChange={handleSectionChange}
                        itemTemplate={experienceTemplate}
                    />

                    <hr style={{ borderColor: 'var(--border)', margin: '2rem 0', opacity: 0.5 }} />

                    <h3 className="section-title" style={{ fontSize: '1.1rem' }}>Education</h3>
                    <ListSectionForm
                        title=""
                        section="education"
                        data={profileData.education}
                        onChange={handleSectionChange}
                        itemTemplate={educationTemplate}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
