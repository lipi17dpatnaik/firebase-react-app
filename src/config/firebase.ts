// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWAe5D1UIydcviXXgwWN_Ts2zM05ba-rk",
  authDomain: "fir-react-app-fd5f1.firebaseapp.com",
  projectId: "fir-react-app-fd5f1",
  storageBucket: "fir-react-app-fd5f1.appspot.com",
  messagingSenderId: "309261310082",
  appId: "1:309261310082:web:b1b897ec977f7c806dbc9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);