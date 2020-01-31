import {combineReducers} from 'redux';

import userReducer from './user/user.reducer';
import carReducer from './cart/cart.reducer';

export default combineReducers({
        user:userReducer,
        cart:carReducer
    });