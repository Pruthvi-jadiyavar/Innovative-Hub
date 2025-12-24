import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [activeTab, setActiveTab] = useState('general');
    const { login, loginWithEmail, verifyAuthorizedUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Auth Modal State
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authPassword, setAuthPassword] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGoogleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await login(); // General Login first

            if (activeTab === 'authorized') {
                setShowAuthModal(true);
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('Failed to log in with Google. ' + (err.message || ''));
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            // Note: username is collected as requested but not used for Firebase Auth login (which relies on email)
            await loginWithEmail(formData.email, formData.password);

            if (activeTab === 'authorized') {
                setShowAuthModal(true);
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('Failed to log in. ' + (err.message || ''));
        } finally {
            setLoading(false);
        }
    };

    const handleAuthVerification = () => {
        if (verifyAuthorizedUser(authPassword)) {
            navigate('/dashboard'); // Proceed to Authorized Dashboard
        } else {
            setError('Incorrect Authorized Password.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                width: '400px',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                background: '#fff',
                textAlign: 'center'
            }}>
                <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Welcome Back</h2>

                <div style={{ display: 'flex', marginBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
                    <button
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: 'none',
                            background: 'none',
                            borderBottom: activeTab === 'general' ? '2px solid #007bff' : 'none',
                            fontWeight: activeTab === 'general' ? 'bold' : 'normal',
                            cursor: 'pointer',
                            color: activeTab === 'general' ? '#007bff' : '#666'
                        }}
                        onClick={() => setActiveTab('general')}
                    >
                        General User
                    </button>
                    <button
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: 'none',
                            background: 'none',
                            borderBottom: activeTab === 'authorized' ? '2px solid #dc3545' : 'none',
                            fontWeight: activeTab === 'authorized' ? 'bold' : 'normal',
                            cursor: 'pointer',
                            color: activeTab === 'authorized' ? '#dc3545' : '#666'
                        }}
                        onClick={() => setActiveTab('authorized')}
                    >
                        Authorized User
                    </button>
                </div>

                {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                <div style={{ marginBottom: '1rem' }}>
                    {activeTab === 'general' ? (
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>
                            Access safety tips, report incidents, and view general alerts.
                        </p>
                    ) : (
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>
                            Restricted access. Please log in and provide the authorized access password.
                        </p>
                    )}
                </div>

                {!showAuthModal ? (
                    <>
                        <form onSubmit={handleEmailLogin} style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Enter username"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>Email ID</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter password"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: activeTab === 'general' ? '#007bff' : '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    opacity: loading ? 0.7 : 1,
                                    fontWeight: 'bold'
                                }}
                            >
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>
                        </form>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ flex: 1, borderBottom: '1px solid #ddd' }}></div>
                            <div style={{ padding: '0 10px', color: '#888', fontSize: '0.9rem' }}>OR</div>
                            <div style={{ flex: 1, borderBottom: '1px solid #ddd' }}></div>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            type="button"
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#fff',
                                color: '#333',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
                            Sign in with Google
                        </button>
                    </>
                ) : (
                    // Authorized Password Modal/View
                    <div style={{ textAlign: 'left' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Enter Authorized Access Password</h3>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                            This section is restricted to authorized personnel only. Please verify your identity.
                        </p>
                        <input
                            type="password"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            placeholder="Shared Password (e.g., admin123)"
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                marginBottom: '1rem'
                            }}
                        />
                        <button
                            onClick={handleAuthVerification}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Verify & Access Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
