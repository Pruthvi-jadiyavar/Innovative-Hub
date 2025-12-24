import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Home, User, Bell, AlertTriangle, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/global.css';

const Layout = ({ children }) => {
    const location = useLocation();
    const { currentUser, logout, userRole } = useAuth();

    const isAuthorized = userRole === 'authorized';

    const generalMenuItems = [
        { label: 'Home', path: '/', icon: <Home size={24} /> },
        { label: 'Events', path: '/events', icon: <Bell size={24} /> },
        { label: 'Danger', path: '/zones', icon: <AlertTriangle size={24} /> },
        { label: 'Report', path: '/report', icon: <Shield size={24} /> },
        { label: 'AI Chat', path: '/chat', icon: <MessageSquare size={24} /> },
        { label: 'Profile', path: '/profile', icon: <User size={24} /> },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>

            {/* Main Content Area - Scrollable */}
            <main style={{ flex: 1, padding: '1rem', overflowY: 'auto', paddingBottom: isAuthorized ? '0' : '90px' }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    padding: '0.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={28} color="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.2} />
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-text-primary)' }}>SafeConnect</h1>
                    </div>
                    {isAuthorized && (
                        <Link to="/profile" style={{ color: 'var(--color-text-primary)' }}>
                            <User size={28} />
                        </Link>
                    )}
                </header>
                {children}
            </main>

            {/* Bottom Navigation Bar - Only for General Users */}
            {!isAuthorized && (
                <nav style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--color-bg-card)',
                    boxShadow: 'var(--shadow-nav)',
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '12px 0 20px 0',
                    zIndex: 1000,
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px'
                }}>
                    {generalMenuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px',
                                    color: isActive ? 'var(--color-accent)' : '#A0AEC0',
                                    width: '100%',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{
                                    padding: '8px',
                                    borderRadius: '12px',
                                    backgroundColor: isActive ? 'rgba(49, 130, 206, 0.1)' : 'transparent'
                                }}>
                                    {item.icon}
                                </div>
                                <span style={{ fontSize: '0.7rem', fontWeight: isActive ? 'bold' : 'normal' }}>
                                    {item.label}
                                </span>
                            </Link>
                        )
                    })}
                </nav>
            )}

            {/* SOS Button - Re-positioned slightly above nav used only for general users mostly, but keeping it ensures safety app functionality. */}
            <button className="fab-sos" style={{ bottom: isAuthorized ? '20px' : '90px', right: '20px' }} onClick={() => alert("SOS SIGNAL SENT! Sharing Live Location...")}>
                SOS
            </button>
        </div>
    );
};

export default Layout;
