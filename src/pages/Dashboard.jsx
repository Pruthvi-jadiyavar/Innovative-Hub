import React, { useState, useEffect } from 'react';
import GeofenceEditor from '../components/Admin/GeofenceEditor';
import { useAuth } from '../contexts/AuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Bell, Shield, MapPin, Phone, User } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const Dashboard = () => {
    const { userRole, currentUser } = useAuth();
    const [status, setStatus] = useState('Active');
    const [reports, setReports] = useState([]);

    const addDemoReports = async () => {
        const demoData = [
            { user: 'Student X', content: 'Suspicious bag found near library', status: 'Pending' },
            { user: 'Staff Y', content: 'Broken street light in parking lot', status: 'Done' },
            { user: 'Anonymous', content: 'Medical assistance required at Block A', status: 'Pending' }
        ];

        for (const report of demoData) {
            await addDoc(collection(db, 'reports'), {
                ...report,
                timestamp: serverTimestamp(),
                image: null
            });
        }
    };

    useEffect(() => {
        if (userRole === 'authorized') {
            const q = query(collection(db, 'reports'), orderBy('timestamp', 'desc'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const reportsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setReports(reportsData);
            });
            return () => unsubscribe();
        }
    }, [userRole]);

    // Mock Data
    const alerts = [
        { id: 1, type: 'Medical', location: 'Library Block', time: '10 mins ago', severity: 'High' },
        { id: 2, type: 'Security', location: 'Main Gate', time: '25 mins ago', severity: 'Medium' }
    ];

    const studentLocations = [
        { id: 1, name: 'Student A', lat: 15.7790, lng: 74.4625 },
        { id: 2, name: 'Student B', lat: 15.7785, lng: 74.4615 }
    ];

    // Removed mock reports array from here

    // Basic role check
    if (userRole !== 'authorized') {
        return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>Access Denied. Authorized personnel only.</div>;
    }

    return (
        <div style={{ padding: '1.5rem', fontFamily: "'Inter', sans-serif", height: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Shield size={28} color="#dc3545" />
                    Authorized Command Center
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '8px 16px', background: '#e2e8f0', borderRadius: '20px', fontSize: '0.9rem' }}>
                        Wait Time: <span style={{ fontWeight: 'bold' }}>~2 mins</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* 1. Status (Squad Status ONLY) */}
                <div id="status" style={cardStyle}>
                    <h3 style={headerStyle}><User size={20} /> Squad Status</h3>
                    <div style={{ marginBottom: '1rem' }}>
                        Current Status: <span style={{ fontWeight: 'bold', color: status === 'Active' ? 'green' : 'grey' }}>{status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => setStatus('Active')} style={{ ...btnStyle, backgroundColor: '#28a745' }}>Active</button>
                        <button onClick={() => setStatus('On Break')} style={{ ...btnStyle, backgroundColor: '#ffc107', color: 'black' }}>On Break</button>
                        <button onClick={() => setStatus('Busy')} style={{ ...btnStyle, backgroundColor: '#dc3545' }}>Busy</button>
                    </div>
                </div>

                {/* 2. Track Location */}
                <div id="tracking" style={{ ...cardStyle, height: '400px' }}>
                    <h3 style={headerStyle}><MapPin size={20} /> Live Tracking</h3>
                    <div style={{ height: '340px', borderRadius: '8px', overflow: 'hidden' }}>
                        <MapContainer center={[15.7788, 74.4621]} zoom={16} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {studentLocations.map(student => (
                                <Marker key={student.id} position={[student.lat, student.lng]}>
                                    <Popup>{student.name}</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>

                {/* 3. Active Alerts */}
                <div id="alerts" style={cardStyle}>
                    <h3 style={headerStyle}><Bell size={20} /> Active Alerts</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                        {alerts.map(alert => (
                            <div key={alert.id} style={{
                                padding: '15px',
                                borderLeft: `5px solid ${alert.severity === 'High' ? 'red' : 'orange'}`,
                                background: '#f8f9fa',
                                borderRadius: '8px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', fontSize: '1rem', marginBottom: '8px' }}>
                                    {alert.type} Emergency
                                    <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: 'normal' }}>{alert.time}</span>
                                </div>
                                <div style={{ fontSize: '0.95rem', color: '#555', display: 'flex', alignItems: 'center' }}>
                                    <MapPin size={16} style={{ marginRight: '6px' }} />
                                    {alert.location}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. User Reports */}
                <div id="reports" style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                            <Shield size={20} /> User Reports
                        </h3>
                        <button onClick={() => addDemoReports()} style={{ fontSize: '0.8rem', padding: '4px 8px', cursor: 'pointer' }}>
                            + Load Demo Data
                        </button>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: '#f1f1f1', textAlign: 'left' }}>
                                <th style={{ padding: '12px', borderBottom: '2px solid #e2e8f0' }}>User</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #e2e8f0' }}>Report Content</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #e2e8f0' }}>Image</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #e2e8f0' }}>Time</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid #e2e8f0' }}>Case Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px', fontWeight: '600', color: '#2d3748' }}>{report.user}</td>
                                    <td style={{ padding: '12px', color: '#4a5568' }}>{report.content}</td>
                                    <td style={{ padding: '12px' }}>
                                        {report.image ? (
                                            <a href={report.image} target="_blank" rel="noopener noreferrer">
                                                <img src={report.image} alt="Evidence" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e0' }} />
                                            </a>
                                        ) : (
                                            <span style={{ color: '#a0aec0', fontSize: '0.85rem', fontStyle: 'italic' }}>No Image</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '12px', color: '#718096', whiteSpace: 'nowrap' }}>
                                        {report.timestamp?.toDate ? report.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold',
                                            backgroundColor: report.status === 'Done' ? '#C6F6D5' : '#FEEBC8',
                                            color: report.status === 'Done' ? '#276749' : '#C05621'
                                        }}>
                                            {report.status || 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const cardStyle = {
    backgroundColor: 'var(--color-bg-card)',
    padding: '1.5rem',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid #e2e8f0'
};

const headerStyle = {
    marginBottom: '1rem',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1.1rem'
};

const btnStyle = {
    padding: '8px 16px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
};

export default Dashboard;
