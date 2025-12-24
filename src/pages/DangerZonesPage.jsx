
import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DangerZonesPage = () => {
    // Mock danger zones matching the recent events
    // Visvesvaraya Technological University (VTU), Belagavi
    const center = [15.7788, 74.4621];

    // Placeholder for College Location
    const collegeLocation = { lat: 15.7788, lng: 74.4621, radius: 250, type: 'safe', reason: 'VTU Belagavi Campus (Safe Zone)' };

    const dangerZones = [
        { id: 1, lat: 15.7820, lng: 74.4650, radius: 400, type: 'danger', reason: 'Highway Traffic/Construction' },
        { id: 2, lat: 15.7750, lng: 74.4580, radius: 300, type: 'warning', reason: 'Slippery Road' },
        { id: 3, lat: 15.7700, lng: 74.4700, radius: 400, type: 'danger', reason: 'Heavy Rain Waterlogging' }
    ];

    const getColor = (type) => {
        switch (type) {
            case 'danger': return '#E53E3E';
            case 'warning': return '#DD6B20';
            case 'safe': return '#3182ce'; // Blue for safe/college
            default: return '#3182ce';
        }
    };

    return (
        <div style={{ paddingBottom: '20px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Danger Zones</h2>
            <div style={{
                flex: 1,
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--shadow-card)',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* College Location */}
                    <Circle
                        center={[collegeLocation.lat, collegeLocation.lng]}
                        radius={collegeLocation.radius}
                        pathOptions={{ color: getColor(collegeLocation.type), fillColor: getColor(collegeLocation.type), fillOpacity: 0.4 }}
                    >
                        <Popup>
                            <strong>College Campus</strong><br />
                            Safe Zone
                        </Popup>
                    </Circle>

                    {/* Danger Zones */}
                    {dangerZones.map((zone) => (
                        <Circle
                            key={zone.id}
                            center={[zone.lat, zone.lng]}
                            radius={zone.radius}
                            pathOptions={{ color: getColor(zone.type), fillColor: getColor(zone.type), fillOpacity: 0.4 }}
                        >
                            <Popup>
                                <strong>{zone.type === 'danger' ? 'Danger Zone' : 'Warning Zone'}</strong><br />
                                {zone.reason}
                            </Popup>
                        </Circle>
                    ))}
                </MapContainer>

                {/* Legend Overlay */}
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    zIndex: 1000 // Ensure it's above the map
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3182ce', border: '1px solid #3182ce' }}></div>
                        <span>College (Safe Zone)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#E53E3E', border: '1px solid #E53E3E' }}></div>
                        <span>Danger (Active Threat)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#DD6B20', border: '1px solid #DD6B20' }}></div>
                        <span>Warning (Caution)</span>
                    </div>
                </div>
            </div>
            <p style={{ marginTop: '10px', color: 'var(--color-text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
                Red zones indicate active alerts. Avoid these areas.
            </p>
        </div>
    );
};

export default DangerZonesPage;
