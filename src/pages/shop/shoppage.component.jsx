import React from 'react';
import {Route} from 'react-router-dom';

import CollectionsOverView from '../../components/collections-overview/collections-overview.components';
import CategoryPage from '../category/category.component';


const ShopPage = ({ match}) => {
  console.log(match);
  return (     
      <div className='shop-page'>
       <Route exact path={`${match.path}`} component={CollectionsOverView}/>
       <Route path={`${match.path}/:categoryId`} component={CategoryPage}/>
      </div>
  ) }; 

export default ShopPage;