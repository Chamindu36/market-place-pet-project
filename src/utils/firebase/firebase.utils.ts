import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    writeBatch,
    query,
    QueryDocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../../store/category/category.types';

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
console.log('firebaseApp: ', firebaseApp);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// Define a type to add an object
export type ObjectToAdd = {
    title: string,
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string, 
    objects: Array<T>
) : Promise<void> => {
    // create a batch to process multiple transactions
    const batch = writeBatch(db);
    // create a new collection
    const collectionRef = collection(db, collectionKey);

    // get docref and set data for that doc ref
    objects.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    // write all transactions in batch to db
    await batch.commit();
    console.log('done');
};


export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    // get collection reference
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    // get all documents and create a map
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
        docSnapshot => docSnapshot.data() as Category //casting for query objects
    );

    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});

    // return categoryMap;
};

export type AdditionalInfo = {
    displayName?: string;
};

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

export const createUserDocumentFromAuth = async (
    userAuth : User,
    additionalInfo = {} as AdditionalInfo
) : Promise<QueryDocumentSnapshot<UserData> |void> => {
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
            console.log('Error creating user', error);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
    email: string, 
    password: string,
) => {
    // if not either email or password is given, return
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
    email : string, 
    password : string,
) => {
    // if not either email or password is given, return
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (
    callback: NextOrObserver<User>
) =>
    onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
}