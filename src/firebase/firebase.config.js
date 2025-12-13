// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAxSLr57auWsV7h6saAx5_em2QXU8ireg",
  authDomain: "food-lovers-63145.firebaseapp.com",
  projectId: "food-lovers-63145",
  storageBucket: "food-lovers-63145.firebasestorage.app",
  messagingSenderId: "677646759244",
  appId: "1:677646759244:web:edaa5e019d253cf09dcbe9",
  measurementId: "G-51BKL2LGQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);