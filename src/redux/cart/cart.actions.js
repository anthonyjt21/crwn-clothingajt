import CartActionTypes from './cart.types';

//action creator
export const toogleCartHidden = () => ({
  type: CartActionTypes.TOOGGLE_CART_HIDDEN
});

export const addItem = item =>({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeItem = item => (
  {type:CartActionTypes.REMOVE_ITEM,
    payload:item
  });
  
export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
   payload:item
});

