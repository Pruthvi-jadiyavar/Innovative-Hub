import React, { useEffect, useState } from 'react';
import { AlertOctagon } from 'lucide-react';
import { getRecentAlerts } from '../services/db';

const RecentEventsPage = () => {
    const [recentEvents, setRecentEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRecentAlerts();
            // If no data in DB, fallback to mock for demo purposes, or show empty state
            if (data.length === 0) {
                setRecentEvents([
                    { id: 1, title: 'No Connection / Empty DB', desc: 'Showing mock data...', type: 'warning' },
                    { id: 2, title: 'Mock Road Block', desc: 'Main Gate under repair', type: 'warning' },
                    { id: 3, title: 'Mock Heavy Rain', desc: 'Avoid low-lying areas', type: 'danger' }
                ]);
            } else {
                setRecentEvents(data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading Events...</div>;

    return (
        <div style={{ paddingBottom: '20px' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Recent Events</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {recentEvents.map(event => (
                    <div key={event.id} style={{
                        padding: '16px',
                        backgroundColor: 'var(--color-bg-card)',
                        borderRadius: 'var(--border-radius)',
                        borderLeft: `4px solid ${event.type === 'danger' ? 'var(--color-danger)' : 'var(--color-warning)'}`,
                        boxShadow: 'var(--shadow-card)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <AlertOctagon size={28} color={event.type === 'danger' ? 'var(--color-danger)' : 'var(--color-warning)'} />
                        <div>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{event.title}</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{event.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentEventsPage;
