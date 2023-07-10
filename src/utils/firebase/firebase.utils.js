import { Provider } from '@firebase/component';
import { constants } from 'buffer';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAy_RME8eCqgH0M91pLmnyjlKFdDktmIA",
    authDomain: "market-place-pet-project-db.firebaseapp.com",
    projectId: "market-place-pet-project-db",
    storageBucket: "market-place-pet-project-db.appspot.com",
    messagingSenderId: "659129455463",
    appId: "1:659129455463:web:1dd29ea1f9c73d6bd755c2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);