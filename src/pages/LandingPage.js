import React, { useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await firebase.firebaseAuth.signOut();
            console.log('User logged out');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <div>
            <button onClick={handleLogout} style={{ position: 'absolute', top: '10px', right: '10px', padding: '10px 20px', background: '#f00', color: '#fff', border: 'none', cursor: 'pointer' }}>
                Logout
            </button>
            <div>LandingPage</div>
        </div>
    );
};

export default LandingPage;
