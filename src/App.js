import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shoppage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sing-in-add-sign-up.components'
import Header from './components/header/header.component';

import {
  Switch, Route, Link
} from 'react-router-dom';

function App() {
  return (
    <div>      
      <Header/>
      <Switch>
      <Route  exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />      
      <Route path='/signin' component={SignInAndSignUpPage} />      
      </Switch>
    </div>
  );
}

export default App;
