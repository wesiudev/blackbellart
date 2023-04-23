import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const authAppConfig = {
  apiKey: "AIzaSyCAle_uMzzfqR3qggxrFfgKIwEyCiWVrVA",
  authDomain: "blackbellart-624af.firebaseapp.com",
  projectId: "blackbellart-624af",
  storageBucket: "blackbellart-624af.appspot.com",
  messagingSenderId: "42682686459",
  appId: "1:42682686459:web:eecc68af582ee6c06d095e",
  measurementId: "G-QVSPHH934F",
};
const authApp = initializeApp(authAppConfig, "secondary");

const provider = new GoogleAuthProvider();

const auth = getAuth(authApp);

export { provider, auth };
