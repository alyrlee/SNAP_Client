
import React, { Component } from 'react';
import config from '../src/config';
import TokenService from '../src/Components/Services/token-service'
import { Switch, Route } from 'react-router';
import './App.css';
import NavBar from './Components/NavBar/NavBar'
import LandingPage from './Components/LandingPage /LandingPage';
import LoginForm from '../src/Components/LoginForm/LoginForm'
import About from '../src/Components/About/About'
import GooglePlaces from './Components/Google Map/GooglePlaces';

class App extends Component {
  state  = {
    stores: []
  };

  componentDidMount() {
    if (!TokenService.getAuthToken()){
   return;
 } 

 fetch(`${config.API_ENDPOINT}/stores`,{
   headers: {
     'authorization': `bearer ${TokenService.getAuthToken()}`
   }
 })
 
 .then(res => {
  if (!res.ok) {
    return res.json().then(e => Promise.reject(e));
  }
  return res.json();
})
.then(stores => {
  this.setState({stores});
})
.catch(error => {
  console.error({error});
})
}

  render() {
  //error handler
  //store context


  return (
    <main className="App">
    <Switch>
      <Route path='/NavBar' component={NavBar}/> 
     < Route exact path='/' component={LandingPage}/> 
     < Route exact path='/about' component={About}/> 
      <Route path='/login' component={LoginForm}/>
      <Route path='/find' component={GooglePlaces}/>
  </Switch> 
</main>
  );
}
}

export default App;
