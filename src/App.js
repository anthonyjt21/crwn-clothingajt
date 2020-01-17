import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shoppage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sing-in-add-sign-up.components'
import Header from './components/header/header.component';
import {auth} from './firebase/firebase.util';

import {
  Switch, Route, Link
} from 'react-router-dom';

class App extends React.Component {
  constructor() {
      super();
      this.state ={
        currentUser: null
      }
  }

unsubscribeFromAuth = null;

componentDidMount(){
 this.unsubscribeFromAuth= auth.onAuthStateChanged(user=>{
    this.setState({currentUser:user});
    console.log(user);
 });
}

componentWillUnmount() {
 this.unsubscribeFromAuth();
}
render()
{ return (
  <div>      
    <Header currentUser ={this.state.currentUser} />
    <Switch>
    <Route exact path='/' component={HomePage} />
    <Route path='/shop' component={ShopPage} />      
    <Route path='/signin' component={SignInAndSignUpPage} />      
    </Switch>
  </div>
);
}
}
export default App;
