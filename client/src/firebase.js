// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "life-mern.firebaseapp.com",
  projectId: "life-mern",
  storageBucket: "life-mern.firebasestorage.app",
  messagingSenderId: "271870123314",
  appId: "1:271870123314:web:1f4be0cb94761490e64b2b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);