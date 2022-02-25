import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';
import {
	signInSuccess,
	signInFailure,
	signOutSucess,
	signOutFailure,
  signUpSucess,
  signUpFailure
} from './user.actions';

import {
	auth,
	googleProvider,
	createUserProfileDocument,
	getCurrentUser,
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
		const userSnapshot = yield userRef.get();
		console.log('*start.getSnapshotFromUserAuth.signInSuccess');
		yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
		console.log('*end.getSnapshotFromUserAuth.signInSuccess');
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signInWithGoogle() {
	try {
		//const userRef = yield auth.signInWithPopup(googleProvider);
		console.log('*signInWithGoogle');
		const {user} = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}
export function* signInWithEmail({payload: {email, password}}) {
	try {
		console.log('*signInWithEmail');
		console.log('*email' + email);
		const {user} = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}
export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) {
			return;
		}
		yield getSnapshotFromUserAuth(userAuth);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSucess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}
export function* signUp({payload: {email, password, displayName}}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(
      email,
      password
    );
    yield put(signInSuccess({user, additionalData:{displayName}}));
	} catch (error) {
		yield put(signUpFailure(error));
	}
}

export function* signInAfterSignUp({payload:{user, additionalData}}){
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}
export function* onSignUpSuccess(){
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutStart),
		call(onSignUpStart),
    call(onSignUpSuccess)
	]);
}
