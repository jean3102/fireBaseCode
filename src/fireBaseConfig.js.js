// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6BTRU6UZ0Fm2AhoNNgPa_pOM6u3QiNVs",
  authDomain: "loginreact-76eb3.firebaseapp.com",
  projectId: "loginreact-76eb3",
  storageBucket: "loginreact-76eb3.appspot.com",
  messagingSenderId: "867090384102",
  appId: "1:867090384102:web:799a7cc89fbb3adc53a727",
  measurementId: "G-TLGJKRYMJD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
