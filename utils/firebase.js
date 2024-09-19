// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyB479rzeQ4NdyAfQRVz5hMwbm2dZNxZpsg",
//   authDomain: "miniproject-1bb95.firebaseapp.com",
//   projectId: "miniproject-1bb95",
//   storageBucket: "miniproject-1bb95.appspot.com",
//   messagingSenderId: "43493497023",
//   appId: "1:43493497023:web:b6d34c1a113800679c8e0a",
//   measurementId: "G-ECJZKP1MDW"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const firestore = getFirestore(app);

// export { auth, firestore };


import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB479rzeQ4NdyAfQRVz5hMwbm2dZNxZpsg",
  authDomain: "miniproject-1bb95.firebaseapp.com",
  projectId: "miniproject-1bb95",
  storageBucket: "miniproject-1bb95.appspot.com",
  messagingSenderId: "43493497023",
  appId: "1:43493497023:web:b6d34c1a113800679c8e0a",
  measurementId: "G-ECJZKP1MDW"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
