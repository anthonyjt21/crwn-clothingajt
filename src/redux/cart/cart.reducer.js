import CartActionTypes from './cart.types';
import {addItemToCart} from './cart.utils'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action ) => {
    console.log(action.type);
    switch (action.type) {
        
        case CartActionTypes.TOOGGLE_CART_HIDDEN: 
            console.log("case 1");
          return {
              ...state,
              hidden: !state.hidden
          };

        case CartActionTypes.ADD_ITEM: 
           return {
               ...state,
               cartItems:addItemToCart(state.cartItems,action.payload)
           };
        default:{
            console.log("case default");
           return state;
        }
    }

}
export default cartReducer;