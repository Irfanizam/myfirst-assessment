// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVosgm2SwNGW1m0pe8vRJbWfyHlUEqliY",
  authDomain: "todo-application-6aef0.firebaseapp.com",
  projectId: "todo-application-6aef0",
  storageBucket: "todo-application-6aef0.firebasestorage.app",
  messagingSenderId: "592875581085",
  appId: "1:592875581085:web:52c0544cdd1a6106f46e74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;