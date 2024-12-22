import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext } from 'react';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "abc-ims.firebaseapp.com",
    projectId: "abc-ims",
    storageBucket: "abc-ims.firebasestorage.app",
    messagingSenderId: "817448649829",
    appId: "1:817448649829:web:fd0f18609199d0c0af328c",
    measurementId: "G-YNV1MJT7VP"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(userCredential => userCredential.user)
            .catch(error => {
                console.error('Error signing up:', error.message);
                throw error;
            });
    };

    const signinUser = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password)
            .then(userCredential => userCredential.user)
            .catch(error => {
                console.error('Error signing in:', error.message);
                throw error;
            });
    };

    const getCurrentUser = () => firebaseAuth.currentUser;

    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signinUser, firebaseAuth, getCurrentUser }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};
