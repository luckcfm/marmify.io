import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
const config = {
  apiKey: "AIzaSyAc4tA5otkmlLiyU8nxGQ-eYhqUSS6B0Ic",
  authDomain: "marmify-a9390.firebaseapp.com",
  databaseURL: "https://marmify-a9390.firebaseio.com",
  projectId: "marmify-a9390",
  storageBucket: "marmify-a9390.appspot.com",
  messagingSenderId: "378876219664",
  appId: "1:378876219664:web:2350338fda85c95ce55595",
  measurementId: "G-3J1935TXW0"
}

firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();