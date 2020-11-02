import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Headers/Header';
import LandingPage from './Components/LandingPage /LandingPage';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import LoginForm from './Components/LoginForm/LoginForm';
import About from '../src/Components/About/About';
import Profile from './Components/LoginForm/Profile';
import MapLanding from './Components/GoogleMap/MapLanding';
import config from '../src/config';
import TokenService from '../src/Components/Services/token-service';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

function App() {

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:8008/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
    
  return (
    <Fragment>
      <Router>
      <main className="App">
        <Switch>
          <Route path='/NavBar' component={Header}/> 
          <Route exact path='/register' 
                render={props =>
                !isAuthenticated ? (
                <RegistrationForm {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to ='Profile' />
                )
              }
              />     
          <Route exact path= '/home' 
                  render={props =>
                  !isAuthenticated ? (
                  <LandingPage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to ='Home' />
                ) 
              } 
            />   
          <Route exact path='/about' 
                   render={props =>
                    !isAuthenticated ? (
                    <About {...props} setAuth={setAuth} />
                    ) : (
                      <Redirect to ='About' />
                    ) 
                  } 
                />    
          <Route path='/login'
                  render={props =>
                   !isAuthenticated ? (
                    <LoginForm {...props} setAuth={setAuth} />
                    ) : (
                      <Redirect to ='Home' />
                    ) 
                  } 
                />    
          <Route path='/find' 
                  render={props =>
                  !isAuthenticated ? (
                  <MapLanding {...props} setAuth={setAuth} />
                  ) : (
                 <Redirect to ='Find' />
                    ) 
                  } 
                />     
        </Switch> 
      </main>
      </Router>
    </Fragment>
    );
}

export default App;
