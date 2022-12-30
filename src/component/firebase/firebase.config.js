// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVnr06_43HL5GNW8TWVTPQNjFnq_1XypI",
  authDomain: "task-manager-45998.firebaseapp.com",
  projectId: "task-manager-45998",
  storageBucket: "task-manager-45998.appspot.com",
  messagingSenderId: "340783970756",
  appId: "1:340783970756:web:74221d61579402038fcc91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;