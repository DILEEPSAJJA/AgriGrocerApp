import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAH3_2akLuClp8B66ciWpf1Un9zxRnJxV4",
    authDomain: "agri-de0a0.firebaseapp.com",
    projectId: "agri-de0a0",
    storageBucket: "agri-de0a0.appspot.com",
    messagingSenderId: "676907194442",
    appId: "1:676907194442:web:20347b4e94032919862eb3"
  };
  

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
