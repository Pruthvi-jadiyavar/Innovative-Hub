import React, { useEffect, useState } from 'react';
import { Phone, Shield } from 'lucide-react';

const Home = () => {
    const [location, setLocation] = useState(null);
    const [status, setStatus] = useState('Safe');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    console.log("Live Location Accessed:", position.coords);
                },
                (error) => {
                    console.error("Error accessing location:", error);
                    // alert("Please enable GPS for safety features."); // Optional: Don't spam alert on every reload if desired
                }
            );
        }
    }, []);

    const emergencyContacts = [
        { name: 'Police Control', number: '100', icon: <Shield size={18} /> },
        { name: 'Ambulance', number: '108', icon: <Phone size={18} /> },
        { name: 'Campus Security', number: '+91 98765 43210', icon: <Shield size={18} /> },
        { name: 'Women Helpline', number: '1091', icon: <Phone size={18} /> },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '20px' }}>
            {/* Status Card */}
            <div style={{
                backgroundColor: 'var(--color-bg-card)',
                padding: '1.5rem',
                borderRadius: 'var(--border-radius)',
                borderLeft: `4px solid ${status === 'Safe' ? 'var(--color-success)' : 'var(--color-danger)'}`,
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div>
                    <h2 style={{ color: 'var(--color-text-primary)' }}>Status: {status}</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                        {location ? "GPS Tracking Active - You are monitored." : "Requesting Location for safety..."}
                    </p>
                </div>
                <div style={{
                    padding: '12px',
                    borderRadius: '50%',
                    backgroundColor: status === 'Safe' ? 'rgba(56, 161, 105, 0.1)' : 'rgba(229, 62, 62, 0.1)'
                }}>
                    <Shield size={32} color={status === 'Safe' ? 'var(--color-success)' : 'var(--color-danger)'} />
                </div>
            </div>

            {/* Emergency Contacts - Horizontal Scroll */}
            <div>
                <h4 style={{ marginBottom: '10px', color: 'var(--color-text-primary)' }}>Emergency Contacts</h4>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
                    {emergencyContacts.map((contact, index) => (
                        <div key={index} style={{
                            minWidth: '140px',
                            padding: '16px',
                            backgroundColor: 'var(--color-bg-card)',
                            borderRadius: 'var(--border-radius)',
                            boxShadow: 'var(--shadow-card)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer'
                        }} onClick={() => window.open(`tel:${contact.number}`)}>
                            <div style={{
                                padding: '10px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--color-bg-secondary)',
                                color: 'var(--color-accent)'
                            }}>
                                {contact.icon}
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center' }}>{contact.name}</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-danger)', fontWeight: 'bold' }}>{contact.number}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions / Tips can be added here later */}
            <div style={{
                backgroundColor: 'var(--color-bg-secondary)',
                padding: '1rem',
                borderRadius: 'var(--border-radius)',
                marginTop: '1rem'
            }}>
                <h4 style={{ margin: '0 0 8px 0' }}>Safety Tip</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    Stay aware of your surroundings. Check "Danger Zones" before travelling late at night.
                </p>
            </div>
        </div>
    );
};

export default Home;
