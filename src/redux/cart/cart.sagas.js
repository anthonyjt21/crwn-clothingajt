import {all, call, takeLast, put} from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import {clearCart} from './cart.actions';

export function* clearCartOnSignOut() {
	yield put(clearCart());
}

export function* onSignOutSuccess() {
	yield takeLast(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
	yield all([call(onSignOutSuccess)]);
}
