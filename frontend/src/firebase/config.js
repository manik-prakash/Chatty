// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpYhb0st-l2MJVUCzPx0lxuR41zG3nPTs",
  authDomain: "chatty-002.firebaseapp.com",
  projectId: "chatty-002",
  storageBucket: "chatty-002.firebasestorage.app",
  messagingSenderId: "488269001029",
  appId: "1:488269001029:web:4f80a3480a598cd0c90e2c",
  measurementId: "G-2HGP2LX4V0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };