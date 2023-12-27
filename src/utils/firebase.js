// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDgrcTUlOg8U7EfiCfGjtHMSvImajTGUN0",
    authDomain: "netflixgpt-b95ea.firebaseapp.com",
    projectId: "netflixgpt-b95ea",
    storageBucket: "netflixgpt-b95ea.appspot.com",
    messagingSenderId: "312781889748",
    appId: "1:312781889748:web:8d549789c80666b9555b41",
    measurementId: "G-86K22ZJZD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();