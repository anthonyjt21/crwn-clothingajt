import React from 'react';
import {connect} from 'react-redux';

import { toogleCartHidden} from '../../redux/cart/cart.actions';


import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';


const CartIcon = ({toogleCartHidden,itemCount}) => (
    <div className='cart-icon' onClick={toogleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => (
    {
        toogleCartHidden: () => dispatch(toogleCartHidden())
    }
);

const mapStateToProps = ({cart :{cartItems}}) =>
    {
        console.log(' i am being called')
        return (  {

  itemCount: cartItems.reduce ((accumulatedQuantity, cartItem) => accumulatedQuantity+ cartItem.quantity
  
  ,0)

})} ;

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);