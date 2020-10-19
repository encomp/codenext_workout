import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseConfig } from './firebaseConfig';

try {
    firebase.initializeApp(FirebaseConfig);
    let app = firebase.app();
    let features = ['auth', 'firestore', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
    console.log(`Firebase SDK loaded with ${features.join(', ')}`);
} catch (e) {
    console.error(e);
    console.log('Error loading the Firebase SDK, check the console.');
}

export default firebase;
export const app = firebase.app;
export const auth = firebase.auth;
export const firestore = firebase.firestore();
