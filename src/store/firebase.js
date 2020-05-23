import app from 'firebase/app';
import 'firebase/auth';
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

class Firebase {
  constructor() {
    app.initializeApp(config);
 
    this.auth = app.auth();
  }
 
  // *** Auth API ***
 
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
 
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
 
  doSignOut = () => this.auth.signOut();
 
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;