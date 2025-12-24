import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const { currentUser, userRole, login, logout } = useAuth();
    const navigate = useNavigate();
    const [showSettings, setShowSettings] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>User Profile</h2>

            {currentUser ? (
                <div style={{
                    backgroundColor: 'var(--color-bg-card)',
                    padding: '1.5rem',
                    borderRadius: 'var(--border-radius)',
                    position: 'relative' // For absolute positioning of settings icon
                }}>
                    {/* Settings Icon */}
                    <button
                        onClick={() => setShowSettings(true)}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-text-secondary)',
                            padding: '5px'
                        }}
                        title="Settings"
                    >
                        <Settings size={24} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        {currentUser.photoURL && (
                            <img src={currentUser.photoURL} alt="Profile" style={{ width: 64, height: 64, borderRadius: '50%' }} />
                        )}
                        <div>
                            <h3>{currentUser.displayName}</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>{currentUser.email}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                        <span style={{
                            padding: '6px 12px',
                            backgroundColor: 'var(--color-bg-secondary)',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: 'var(--color-text-primary)'
                        }}>
                            Role: {userRole ? userRole.toUpperCase() : 'GENERAL'}
                        </span>
                        <span style={{
                            padding: '6px 12px',
                            backgroundColor: 'var(--color-bg-secondary)',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: 'var(--color-text-primary)'
                        }}>
                            Gender: Not specified
                        </span>
                    </div>

                    {/* Authorized Info Section */}
                    {(userRole === 'authorized' || currentUser) && (
                        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                            <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Contact Information</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Email</label>
                                    <p style={{ fontWeight: '500' }}>{currentUser.email}</p>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Phone</label>
                                    <p style={{ fontWeight: '500' }}>+91 XXXXX XXXXX</p>
                                </div>
                            </div>
                            {userRole !== 'authorized' && (
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-info)', marginTop: '8px' }}>
                                    * Full contact details are visible to Authorized Personnel only.
                                </p>
                            )}
                        </div>
                    )}

                    <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ color: 'var(--color-text-primary)' }}>General Settings</h4>
                        {/* Toggles for notifications etc would go here */}
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Preference settings coming soon...</p>
                    </div>

                    {/* Settings Modal Overlay */}
                    {showSettings && (
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000
                        }}>
                            <div style={{
                                backgroundColor: 'white',
                                padding: '2rem',
                                borderRadius: '12px',
                                width: '90%',
                                maxWidth: '350px',
                                position: 'relative',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#666'
                                    }}
                                >
                                    <X size={24} />
                                </button>

                                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                    {currentUser.photoURL ? (
                                        <img src={currentUser.photoURL} alt="Profile" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: '1rem', border: '3px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                                    ) : (
                                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#eee', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '2rem', color: '#888' }}>{currentUser.displayName ? currentUser.displayName.charAt(0) : 'U'}</span>
                                        </div>
                                    )}
                                    <h3 style={{ marginBottom: '5px' }}>{currentUser.displayName}</h3>
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>{currentUser.email}</p>
                                    <div style={{ marginTop: '10px' }}>
                                        <span style={{
                                            background: userRole === 'authorized' ? '#dc3545' : '#007bff',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {userRole ? userRole.toUpperCase() : 'GENERAL USER'}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            backgroundColor: '#E53E3E',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <LogOut size={18} />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p>Please log in to view your profile.</p>
                    <button
                        onClick={login}
                        style={{
                            marginTop: '1rem',
                            padding: '10px 20px',
                            backgroundColor: 'var(--color-primary-btn)',
                            color: '#fff',
                            borderRadius: 'var(--border-radius)',
                            fontSize: '1rem'
                        }}
                    >
                        Sign in with Google
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserPage;
