import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState('general'); // general, authorized (requires password verification)
    const [loading, setLoading] = useState(true);

    const AUTHORIZED_PASSWORD = import.meta.env.VITE_AUTHORIZED_PASSWORD || 'admin123';

    const login = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // Default to general role on login. Authorized requires generic password check.
            setUserRole('general');
            return result.user;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const loginWithEmail = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            // Default to general role on login.
            setUserRole('general');
            return result.user;
        } catch (error) {
            console.error("Email login failed", error);
            throw error;
        }
    };

    const verifyAuthorizedUser = (password) => {
        if (password === AUTHORIZED_PASSWORD) {
            setUserRole('authorized');
            localStorage.setItem('user_role', 'authorized');
            return true;
        }
        return false;
    };

    const logout = () => {
        setUserRole('general'); // Reset role on logout
        localStorage.removeItem('user_role');
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (!user) {
                setUserRole('general');
                localStorage.removeItem('user_role');
            } else {
                // Restore role from local storage if valid
                const storedRole = localStorage.getItem('user_role');
                if (storedRole === 'authorized') {
                    setUserRole('authorized');
                } else {
                    setUserRole('general');
                }
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userRole,
        login,
        loginWithEmail,
        verifyAuthorizedUser,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
