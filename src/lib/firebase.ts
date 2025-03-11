
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
// Replace these placeholder values with mock values that will allow the auth to work in demo mode
const firebaseConfig = {
  apiKey: "AIzaSyDHgzOjdbXyj7YQMb8ZuhX0_JYGxW23s3Y",
  authDomain: "mockproject.firebaseapp.com",
  projectId: "mockproject",
  storageBucket: "mockproject.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
