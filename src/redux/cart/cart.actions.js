import CartActionTypes from './cart.types';

//action creator
export const toogleCartHidden = () => ({
  type: CartActionTypes.TOOGGLE_CART_HIDDEN
});

export const addItem = item =>({
  type: CartActionTypes.ADD_ITEM,
  payload: item
})