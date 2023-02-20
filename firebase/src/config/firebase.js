import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCVvlH0j8FhSMgctPzP1wil-SZTXL3rZ0w',
  authDomain: 'react-firebase-clone-e4505.firebaseapp.com',
  projectId: 'react-firebase-clone-e4505',
  storageBucket: 'react-firebase-clone-e4505.appspot.com',
  messagingSenderId: '826875457138',
  appId: '1:826875457138:web:223023b971e5853d169ceb',
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
