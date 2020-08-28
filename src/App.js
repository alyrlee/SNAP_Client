
import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router';
import './App.css';
import NavBar from './Components/NavBar/NavBar'
import LandingPage from './Components/LandingPage /LandingPage';
import LoginForm from '../src/Components/LoginForm/LoginForm'
import GooglePlaces from './Components/Google Map/GooglePlaces';
// var cors = require('cors');


class App extends Component {
  render() {
  return (
    <main className="App">
    {/* <LandingPage />
    <LoginForm />
    <GooglePlaces />
    <MapContainer />  */}
    <Switch>
    <Route path='/NavBar' component={NavBar}/> 
     <Route exact path='/' component={LandingPage}/> 
      <Route path='/login' component={LoginForm}/>
      <Route path='/find' component={GooglePlaces}/>
      
  </Switch> 
    </main>
  );
}
}

export default App;
