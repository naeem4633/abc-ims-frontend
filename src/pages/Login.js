import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { Link, useNavigate } from 'react-router-dom';
import '../authorization.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const firebase = useFirebase();

    useEffect(() => {
        const unsubscribe = firebase.firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                console.log(`${user.email} is already signed in, redirecting to landing page...`);
                navigate('/');
            }
        });

        return unsubscribe;
    }, [firebase, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await firebase.signinUser(email, password);
            console.log('Login successful');
            navigate('/');
        } catch (err) {
            setError(err.message);
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
                    <input type="email" id="email" name="email" className="authorization-input" 
                        value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
                </div>

                <div className="authorization-flex-column">
                    <label>Password </label>
                </div>
                <div className="authorization-inputForm">
                    <input type="password" id="password" name="password" className="authorization-input" 
                        value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
                </div>

                {error && <p className="error-text">{error}</p>}

                <button type="button" onClick={handleLogin} 
                    className="authorization-button-submit transition-all duration-200" 
                    disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
                <p className="authorization-p">Don't have an account? 
                    <span className="authorization-span"><Link to={'/signup'}>Sign Up</Link></span>
                </p>
            </form>
        </section>
    );
};

export default Login;
