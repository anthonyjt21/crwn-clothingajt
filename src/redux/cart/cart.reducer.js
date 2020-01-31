import CartActionTypes from './cart.types';

const INITIAL_STATE = {
    hidden: true
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

        default:{
            console.log("case default");
           return state;
        }
    }

}
export default cartReducer;