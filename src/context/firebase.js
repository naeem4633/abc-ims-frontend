// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "abc-ims.firebaseapp.com",
  projectId: "abc-ims",
  storageBucket: "abc-ims.firebasestorage.app",
  messagingSenderId: "817448649829",
  appId: "1:817448649829:web:fd0f18609199d0c0af328c",
  measurementId: "G-YNV1MJT7VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);