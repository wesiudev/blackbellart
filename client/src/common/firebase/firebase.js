// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvMnJaJPoPEUjtaODrGz4rVaNCc2_1E-A",
  authDomain: "blackbellart-624af.firebaseapp.com",
  projectId: "blackbellart-624af",
  storageBucket: "blackbellart-624af.appspot.com",
  messagingSenderId: "42682686459",
  appId: "1:42682686459:web:549a72095a6b9e886d095e",
  measurementId: "G-5FMTNRN9EX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
