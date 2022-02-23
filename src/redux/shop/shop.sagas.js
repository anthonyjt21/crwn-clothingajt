import { takeEvery, call, put } from "redux-saga/effects";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { fetchCollectionsSucess, fetchCollectionsFailure } from "./shop.actions";


import ShopActionTypes from "./shop.types";

export function* fetchCollectionStartAsync() { 
  try{
    const collectionRef = firestore.collection("collections"); 
    const snapshot = yield collectionRef.get();
    //const collectionMap = convertCollectionsSnapshotToMap(snapshot);
    const collectionMap = yield call(convertCollectionsSnapshotToMap,snapshot);
    yield put(fetchCollectionsSucess(collectionMap));
  }catch(error){
    yield put(fetchCollectionsFailure(error.message))
  }
 

  /*collectionRef.get().then((snapshot) => {
   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
   dispatch(fetchCollectionsSucess(collectionsMap));
  
  }).catch(error => dispatch(fetchCollectionsFailure(error.message)));*/
}
export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionStartAsync
  );
}
