import React, { useEffect } from 'react';

function AlertBar({ message, type, onClose }) {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(onClose, 2500);
        return () => clearTimeout(timer);
    }, [message]);

    const getIcon = () => {
        if (type === 'success') return '✔';
        if (type === 'error') return '✖';
        return 'ℹ';
    };

    if (!message) return null;

    return (
        <div className={`alert-bar ${type}`}>
            <span>{message}</span>
            <button onClick={onClose}>×</button>
        </div>
    );
}

export default AlertBar;