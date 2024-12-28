import React, { useState } from 'react';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../authorization.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const firebase = useFirebase();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Login the admin with Firebase
            const userCredential = await firebase.signinUser(email, password);
            console.log('Admin Login successful');

            const currentUser = firebase.firebaseAuth.currentUser;

            if (!currentUser) {
                throw new Error('No current user found after login.');
            }

            // Get the ID token from the signed-in user
            const idToken = await currentUser.getIdToken();

            // Fetch admin info from the backend
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/user-info/`, {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            const user = response.data.user;
            console.log('Admin Info:', user);

            // Ensure the user is an admin
            if (user.user_detail.role !== 'Admin') {
                throw new Error('Only admins are allowed to login here.');
            }

            // Store user details and navigate to the admin panel
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/admin-panel');
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full relative tracking-wide min-h-[80vh] flex justify-center items-center flex-col">
            <form className="authorization-form">
                <div className="authorization-flex-column">
                    <label>Email</label>
                </div>
                <div className="authorization-inputForm">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="authorization-input"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="authorization-flex-column">
                    <label>Password</label>
                </div>
                <div className="authorization-inputForm">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="authorization-input"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="error-text">{error}</p>}

                <button
                    type="button"
                    onClick={handleLogin}
                    className="authorization-button-submit transition-all duration-200"
                    disabled={loading}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
        </section>
    );
};

export default AdminLogin;
