// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-db43c.firebaseapp.com",
  projectId: "mern-blog-db43c",
  storageBucket: "mern-blog-db43c.appspot.com",
  messagingSenderId: "879908930727",
  appId: "1:879908930727:web:70d04e88a78909643d0782"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);