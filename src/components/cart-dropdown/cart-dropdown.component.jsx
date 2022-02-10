import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer
} from './cart-dropdown.styles';

const CartDropDown = ({cartItems, history,dispatch }) => { //...otherProps 

   // console.log(otherProps)

    return (
    <div className='cart-dropdown'>
        <div className='cart-items' >
            {
                 cartItems.length ? (
                cartItems.map(cartItem=> (                   
                <CartItem key={cartItem.id} item={cartItem} />                
                    ) )
                )
                    :
               (<span className='empty-message'>You cart is empty</span>)
            }
        </div>
           <CustomButton 
              onClick= {() => {
               history.push('/checkout');
               dispatch(toogleCartHidden());
            
            } }> Go to CheckOut</CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
