import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyCTI_kytGmAAdfQzky9_BzKvumP_sjsfJQ",
	authDomain: "crw-db-3044e.firebaseapp.com",
	databaseURL: "https://crw-db-3044e.firebaseio.com",
	projectId: "crw-db-3044e",
	storageBucket: "crw-db-3044e.appspot.com",
	messagingSenderId: "194304408847",
	appId: "1:194304408847:web:612c9549258bb20421d27a",
	measurementId: "G-LDGXZRCJBC",
};
firebase.initializeApp(config);
export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) {
		return;
	}
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	console.log("existe " + !snapShot.exits);
	//console.log(snapShot);
	//const collectionRef = firestore.collection("users");
	//const collectionSnaphot = await collectionRef.get();
	//console.log({collection: collectionSnaphot.docs.map((doc) => doc.data())});

	if (!snapShot.exists) {
		const {displayName, email} = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}
	return userRef;
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd,
) => {
	const collectionRef = firestore.collection(collectionKey);
	//console.log("collectionRef");
	//console.log(collectionRef);
	const batch = firestore.batch();
	//console.log(objectsToAdd);
	objectsToAdd.forEach((obj) => {
		const newDocRef = collectionRef.doc();
		//console.log(newDocRef);
		batch.set(newDocRef, obj);
	});
	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
