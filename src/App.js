import React from 'react';
import './App.css';
 import HomePage from './pages/homepage/homepage.component'
import {
  Switch, Route, Link
} from 'react-router-dom';

const HatsPage = (props) =>{
  console.log(props) 
  return (
  <div>     
      <button onClick ={() => props.history.push('/blog/asdq/topics')}>Topics</button>
    <h1>HatsPage Page</h1>
  </div>)
}
const TopicsList = (props) => {
  // console.log(props)
    return (   
    <div>    
      <h1>Topic List Pagde</h1>
      <Link to={`${props.match.url}/13`}>To Topic 13</Link>
      <Link to={`${props.match.url}/17`}>To Topic 17</Link>
      <Link to={`${props.match.url}/21`}>To Topic 21</Link>    
      <Link to={`${props.match.url}/22`}>To Topic 21</Link>    
    </div>
  )
 
}

const TopicDetail = (props) => {
  // console.log(props)
   return (
     <div>
<h1>Topic Detail Page: {props.match.params.topicId}</h1>
     </div>
   )
}


function App() {
  return (
    <div>      
      <Route  exact path='/' component={HomePage} />
      <Route  exact path='/hats' component={HatsPage} />
      <Route exact path='/blog/asdq/topics' component={TopicsList} />   
      <Route  path='/blog/asdq/topics/:topicId' component={TopicDetail} />          
      <Route exact path='/blog/topics' component={TopicsList} />   
      <Route  path='/blog/topics/:topicId' component={TopicDetail} />          
    </div>
  );
}

export default App;
