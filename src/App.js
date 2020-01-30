import React from 'react';
import {
  Switch, Route, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shoppage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sing-in-add-sign-up.components'
import Header from './components/header/header.component';
import {auth,createUserProfileDocument} from './firebase/firebase.util';
import {setCurrentUser} from './redux/user/user.actions';


class App extends React.Component {

unsubscribeFromAuth = null;

componentDidMount(){
  const {setCurrentUser} =this.props;
 this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth=>{
    //this.setState({currentUser:user});
    if(userAuth){
      /*,
            ()=>{
              console.log(this.state);
          }*/
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot( snapShot => {
         setCurrentUser(
            {
              id:snapShot.id,
              ...snapShot.data()
            }
            );
          console.log(this.state);
          });                
    }
    setCurrentUser(userAuth);
    //createUserProfileDocument(user);
    //console.log(user);
 });
}

componentWillUnmount() {
 this.unsubscribeFromAuth();
}
render()
{ return (
  <div>      
    <Header />
    <Switch>
    <Route exact path='/' component={HomePage} />
    <Route path='/shop' component={ShopPage} />      
     <Route exact path='/signin' render={()=>this.props.currentUser ? (<Redirect to='/' /> ) :(<SignInAndSignUpPage/>)} />      
    </Switch>
  </div>
);
}
}

const mapStateToProps = ({ user }) => (
  {
    currentUser:user.currentUser
  }
)

const mapDispatchToProps = dispatch => (
  {
     setCurrentUser: user => dispatch(setCurrentUser(user))
  }
)
export default connect(mapStateToProps,mapDispatchToProps)(App);
