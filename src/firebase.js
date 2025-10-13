// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGKIMmY7Q0onblhXkThFcWgP74CmNxqhY",
  authDomain: "clone-fe64c.firebaseapp.com",
  projectId: "clone-fe64c",
  storageBucket: "clone-fe64c.firebasestorage.app",
  messagingSenderId: "581878934549",  
  appId: "1:581878934549:web:d5a2148bf2653d1c3ef21c",
  measurementId: "G-6FBJRP5R2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();

export {db, auth};
