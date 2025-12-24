import React, { useEffect, useState } from 'react';
import { AlertTriangle, Info, Bell, X } from 'lucide-react';
import '../../styles/global.css';

const AlertComponent = ({ type = 'info', message, onClose }) => {
    // Styles mapping
    const styles = {
        info: {
            bg: '#e3f2fd',
            color: '#0d47a1',
            border: '#90caf9',
            icon: <Info />
        },
        warning: {
            bg: '#fff3e0',
            color: '#e65100',
            border: '#ffcc80',
            icon: <AlertTriangle />
        },
        emergency: {
            bg: '#ffebee',
            color: '#b71c1c',
            border: '#ef9a9a',
            icon: <Bell className="pulsate" /> // Assume pulsate class exists in App.css or we add valid css style
        }
    };

    const currentStyle = styles[type] || styles.info;

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            backgroundColor: currentStyle.bg,
            color: currentStyle.color,
            border: `1px solid ${currentStyle.border}`,
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '350px',
            animation: 'slideIn 0.3s ease-out'
        }}>
            <div style={{ flexShrink: 0 }}>
                {currentStyle.icon}
            </div>
            <div style={{ flex: 1, fontSize: '0.95rem' }}>
                <strong>{type.toUpperCase()}:</strong> {message}
            </div>
            <button onClick={onClose} style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: currentStyle.color,
                padding: '4px'
            }}>
                <X size={18} />
            </button>
        </div>
    );
};

export default AlertComponent;
