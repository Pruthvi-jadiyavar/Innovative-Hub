import React, { useState } from 'react';

const GeofenceEditor = () => {
    // This would interact with the Map instance in a real scenario
    // For now, it's a form to define zone properties
    const [zoneName, setZoneName] = useState('');
    const [severity, setSeverity] = useState('warning'); // warning, emergency, info

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Geofence "${zoneName}" with severity "${severity}" created!`);
        // Logic to save to Firestore would go here
    };

    return (
        <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '1rem', borderRadius: 'var(--border-radius)' }}>
            <h3>Create Geofence Zone</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px' }}>Zone Name</label>
                    <input
                        type="text"
                        value={zoneName}
                        onChange={(e) => setZoneName(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="e.g., Chemistry Lab Perimeter"
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px' }}>Severity Level</label>
                    <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="info">Info (Blue)</option>
                        <option value="warning">Warning (Orange)</option>
                        <option value="emergency">Emergency (Red)</option>
                    </select>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    * Draw functionality would be enabled on the map to capture coordinates.
                </div>
                <button type="submit" style={{
                    padding: '10px',
                    backgroundColor: 'var(--color-primary-btn)',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: 'var(--border-radius)'
                }}>
                    Save Zone
                </button>
            </form>
        </div>
    );
};

export default GeofenceEditor;
