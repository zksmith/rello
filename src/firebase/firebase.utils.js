import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA4eai_M7w9l1WOWMjim2_-_AYJ5-6RDlM',
  authDomain: 'rello-edb4c.firebaseapp.com',
  databaseURL: 'https://rello-edb4c.firebaseio.com',
  projectId: 'rello-edb4c',
  storageBucket: '',
  messagingSenderId: '504342862586',
  appId: '1:504342862586:web:185e8937588a01f4'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
