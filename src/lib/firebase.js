import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSLT9N_sK_hBui5oFMBDGvwlGh5c_X1jU",
  authDomain: "topzero-group.firebaseapp.com",
  projectId: "topzero-group",
  storageBucket: "topzero-group.firebasestorage.app",
  messagingSenderId: "849781497985",
  appId: "1:849781497985:web:c3057ee176ddfc78286d80",
  measurementId: "G-ZF1RJRQ595"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (safely for local dev)
export let analytics = null;
try { analytics = getAnalytics(app); } catch (e) { console.log("Analytics not supported locally."); }
