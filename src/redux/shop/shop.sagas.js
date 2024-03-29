import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSucess,
  fetchCollectionsFailure,
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionStartAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    //const collectionMap = convertCollectionsSnapshotToMap(snapshot);
    const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSucess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}
export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionStartAsync
  );
}

export function* shopSaga(){
  yield all([call(fetchCollectionsStart)])
}