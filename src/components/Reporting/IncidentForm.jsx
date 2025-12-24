import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const IncidentForm = () => {
    const { currentUser } = useAuth();
    const [description, setDescription] = useState('');
    const [type, setType] = useState('suspicious_activity');
    const [customType, setCustomType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalType = type === 'other' ? customType : type;

        try {
            await addDoc(collection(db, 'reports'), {
                user: currentUser ? currentUser.displayName || currentUser.email : 'Anonymous',
                content: description,
                type: finalType,
                image: null, // Placeholder for future image upload logic
                timestamp: serverTimestamp(),
                status: 'New'
            });
            alert(`Report Submitted Successfully!`);
            setDescription('');
            setCustomType('');
            setType('suspicious_activity');
        } catch (error) {
            console.error("Error adding report: ", error);
            alert("Failed to submit report. Please try again.");
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '1rem', borderRadius: 'var(--border-radius)', maxWidth: '500px' }}>
            <h3 style={{ color: 'var(--color-text-primary)' }}>Report Incident</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', color: 'var(--color-text-secondary)' }}>Incident Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius)', border: '1px solid #E2E8F0', backgroundColor: '#F7FAFC' }}
                    >
                        <option value="suspicious_activity">Suspicious Activity</option>
                        <option value="hazard">Infrastructure Hazard</option>
                        <option value="medical">Medical Emergency</option>
                        <option value="harassment">Harassment</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {type === 'other' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '4px', color: 'var(--color-text-secondary)' }}>Specify Problem</label>
                        <input
                            type="text"
                            value={customType}
                            onChange={(e) => setCustomType(e.target.value)}
                            placeholder="Please specify..."
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius)', border: '1px solid #E2E8F0', backgroundColor: '#F7FAFC' }}
                        />
                    </div>
                )}

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', color: 'var(--color-text-secondary)' }}>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%', padding: '12px', borderRadius: 'var(--border-radius)', border: '1px solid #E2E8F0', minHeight: '100px', backgroundColor: '#F7FAFC' }}
                        placeholder="Describe what happened..."
                        required
                    />
                </div>
                <button type="button" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    border: '1px dashed #ccc',
                    borderRadius: '4px',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)'
                }}>
                    <Camera size={18} />
                    Attach Photo (Optional)
                </button>
                <button type="submit" style={{
                    padding: '10px',
                    backgroundColor: 'var(--color-primary-btn)',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: 'var(--border-radius)'
                }}>
                    Submit Report
                </button>
            </form>
        </div>
    );
};

export default IncidentForm;
