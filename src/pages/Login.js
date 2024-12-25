import React, { useState } from 'react';
import { useFirebase } from '../context/firebase';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../authorization.css';

const Login = () => {
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
            // Login the user with Firebase
            const userCredential = await firebase.signinUser(email, password);
            console.log('Login successful');
    
            // Get the currently signed-in user
            const currentUser = firebase.firebaseAuth.currentUser;
    
            if (!currentUser) {
                throw new Error('No current user found after login.');
            }
    
            // Get the ID token from the signed-in user
            const idToken = await currentUser.getIdToken();
    
            // Fetch user info from the backend
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/user-info/`, {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });
    
            // Log the user info and store it in local storage
            const user = response.data.user;
            console.log('User Info:', user);
            localStorage.setItem('user', JSON.stringify(user));
    
            if (user.user_detail.role === 'Patient') {
                navigate('/patient-landing-page');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='w-full relative tracking-wide min-h-[80vh] flex justify-center items-center flex-col'>
            <form className="authorization-form">
                <div className="authorization-flex-column">
                    <label>Email </label>
                </div>
                <div className="authorization-inputForm">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="authorization-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email"
                    />
                </div>

                <div className="authorization-flex-column">
                    <label>Password </label>
                </div>
                <div className="authorization-inputForm">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="authorization-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your Password"
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
                <p className="authorization-p">
                    Don't have an account?{' '}
                    <span className="authorization-span">
                        <Link to={'/signup'}>Sign Up</Link>
                    </span>
                </p>
            </form>
        </section>
    );
};

export default Login;
