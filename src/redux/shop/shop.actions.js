import ShopActionTypes from './shop.types';

import {firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSucess = collectionMap =>({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap
});

export const fetchCollectionsFailure  = errorMessage => ({
  type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fecthCollectionStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionStart());

    collectionRef.get().then((snapshot) => {
     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
     dispatch(fetchCollectionsSucess(collectionsMap));
    
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
  }
}