import React from 'react';
// import React, { Component } from 'react';
// import { Switch, Link, Route } from 'react-router';
import './App.css';
// import LandingPage from './Components/LandingPage /LandingPage';
// import LoginForm from '../src/Components/LoginForm/LoginForm'
import GoogleMap from '../src/Components/Google Map/GoogleMap'
import SearchBox from '../src/Components/Search/Search'

function App() {
  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }
  return (
    <main className="App">
    {/* <LandingPage />
    <LoginForm /> */}
    <SearchBox />
    <GoogleMap location={location} zoomLevel={8} />
      {/* <Switch>
      {/* <Route exact path='/' component={LandingPage}/> */}
      {/* <Route path='/login' component={LoginForm}/> */}
      {/* <Route path='/NavBar' component={NavBar}/> */}
    {/* </Switch> */} 
    </main>
  );
}

export default App;
