import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

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

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
    if (!userAuth) return;

    // create the user upon sign in 
    const userDocRef = doc(db, 'users', userAuth.uid);

    // extract the data of the created user document
    const userSnapshot = await getDoc(userDocRef);

    // if user data does not exist, create it
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // create the new user document in firestore
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            });
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    // if not either email or password is given, return
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};