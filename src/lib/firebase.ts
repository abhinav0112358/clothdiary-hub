
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1234567890abcdefghijklmnopqrstuv", // Replace with your Firebase API key
  authDomain: "your-project-name.firebaseapp.com", // Replace with your Firebase authDomain
  projectId: "your-project-name", // Replace with your Firebase projectId
  storageBucket: "your-project-name.appspot.com", // Replace with your Firebase storageBucket
  messagingSenderId: "123456789012", // Replace with your Firebase messagingSenderId
  appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9j0k1" // Replace with your Firebase appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
