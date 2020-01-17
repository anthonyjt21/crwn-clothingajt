import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyCTI_kytGmAAdfQzky9_BzKvumP_sjsfJQ",
    authDomain: "crw-db-3044e.firebaseapp.com",
    databaseURL: "https://crw-db-3044e.firebaseio.com",
    projectId: "crw-db-3044e",
    storageBucket: "crw-db-3044e.appspot.com",
    messagingSenderId: "194304408847",
    appId: "1:194304408847:web:612c9549258bb20421d27a",
    measurementId: "G-LDGXZRCJBC"
  };
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth){
     return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  console.log("existe "+!snapShot.exits);
  if(!snapShot.exits) {
    const {displayName, email } =userAuth;
    const createdAt =new Date();
    try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
    }catch(error) {
      console.log('error creating user', error.message);
    }
  }
   return userRef;
};

  firebase.initializeApp(config);

  export const auth= firebase.auth();
  export const firestore =firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;
  