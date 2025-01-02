import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import '../authorization.css';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [abcNumber, setAbcNumber] = useState('');
    const [role, setRole] = useState('Patient'); // Default to Patient
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const firebase = useFirebase();

    const handleSignup = async () => {
        setLoading(true);
        setError('');
        try {
            // Validate ABC number and role on the backend
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/validate-abc/`, {
                abc_number: abcNumber,
                role,
            });
    
            if (response.data.success) {
                // Proceed with Firebase sign-up
                const userCredential = await firebase.signupUserWithEmailAndPassword(email, password);
                const firebaseId = userCredential.uid; // Retrieve Firebase ID
    
                // Update the backend with user details after Firebase signup
                await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/update-user-email/`, {
                    abc_number: abcNumber,
                    email,
                    first_name: firstName,
                    last_name: lastName,
                    firebase_id: firebaseId,
                });
    
                console.log('Signup successful');
    
                // Fetch the full user details after signup
                const idToken = await userCredential.getIdToken();
                const userInfoResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/user-info/`, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });
    
                const user = userInfoResponse.data.user;
                console.log('Fetched User Info:', user);
    
                // Store user details in local storage
                localStorage.setItem('user', JSON.stringify(user));
    
                // Navigate based on role
                if (user.user_detail.role === 'Patient') {
                    navigate('/patient-landing-page');
                } else if (user.user_detail.role === 'Staff') {
                    navigate('/staff-landing-page');
                } else {
                    navigate('/'); // Default fallback
                }
            } else {
                setError('Invalid ABC number or role mismatch.');
            }
        } catch (err) {
            console.error('Signup Error:', err);
            setError(
                err.response?.data?.message ||
                `Error: ${role} with this ABC number does not exist. Please contact admin.`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full relative tracking-wide min-h-[80vh] flex justify-center items-center">
            <form className="authorization-form">
                <div className="authorization-flex-column">
                    <label>ABC Number</label>
                </div>
                <div className="authorization-inputForm">
                    <input
                        type="text"
                        id="abcNumber"
                        name="abcNumber"
                        className="authorization-input"
                        placeholder="Enter your ABC Number"
                        value={abcNumber}
                        onChange={(e) => setAbcNumber(e.target.value)}
                    />
                </div>

                <div className="authorization-flex-column">
                    <label>Role</label>
                </div>
                <div className="authorization-inputForm">
                    <select
                        id="role"
                        name="role"
                        className="authorization-input"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="Patient">Patient</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>

                <div className="authorization-flex-column">
                    <label>First Name</label>
                </div>
                <div className="authorization-inputForm">
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="authorization-input"
                        placeholder="Enter your First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className="authorization-flex-column">
                    <label>Last Name</label>
                </div>
                <div className="authorization-inputForm">
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="authorization-input"
                        placeholder="Enter your Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

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
                    className="authorization-button-submit transition-all duration-200"
                    onClick={handleSignup}
                    disabled={loading}
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
                <p className="authorization-p">
                    Already have an account?{' '}
                    <span className="authorization-span">
                        <Link to={'/login'}>Sign In</Link>
                    </span>
                </p>
            </form>
        </section>
    );
};

export default Signup;
