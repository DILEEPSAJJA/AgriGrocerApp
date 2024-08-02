import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB479rzeQ4NdyAfQRVz5hMwbm2dZNxZpsg",
    authDomain: "miniproject-1bb95.firebaseapp.com",
    projectId: "miniproject-1bb95",
    storageBucket: "miniproject-1bb95.appspot.com",
    messagingSenderId: "43493497023",
    appId: "1:43493497023:web:b6d34c1a113800679c8e0a",
    measurementId: "G-ECJZKP1MDW"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  
  export { auth, firestore, createUserWithEmailAndPassword, doc, setDoc };