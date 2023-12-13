// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'click-267d2.firebaseapp.com',
  projectId: 'click-267d2',
  storageBucket: 'click-267d2.appspot.com',
  messagingSenderId: '923055594938',
  appId: '1:923055594938:web:c434db4c8e20e052325183',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
