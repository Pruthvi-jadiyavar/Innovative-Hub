import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

// Fetch Recent Alerts
export const getRecentAlerts = async () => {
    try {
        const alertsRef = collection(db, 'alerts');
        const q = query(alertsRef, orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching alerts:", error);
        return [];
    }
};

// Fetch Danger Zones
export const getDangerZones = async () => {
    try {
        const zonesRef = collection(db, 'danger_zones');
        const snapshot = await getDocs(zonesRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching danger zones:", error);
        return [];
    }
};
