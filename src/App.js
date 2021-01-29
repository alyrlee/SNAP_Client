import React, { Component } from 'react';
import './App.css';
import Header from './Components/Headers/Header';
import LandingPage from './Components/LandingPage /LandingPage';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import LoginForm from '../src/Components/LoginForm/LoginForm';
import PrivateRoute from '../src/Utils/PrivateRoute';
import PublicOnlyRoute from '../src/Utils/PublicOnlyRoute';
import About from '../src/Components/About/About';
import Profile from './Components/LoginForm/Profile';
import MapLanding from './Components/GoogleMap/MapLanding';
import { Route, Router } from "react-router-dom";
import history from './Contexts/history';

class App extends Component {
  state = {
     hasError: false,
    };

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }
    
  render() {
    return (
      <div className='App'>
    <Router history={history}>
        <header className="ui container">
          <Header />
        </header>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
            <Route
              exact
              path={'/'}
              component={LandingPage}
            />
            <Route
              exact
              path={'/about'}
              component={About}
            />
            <Route
              exact
              path={'/find'}
              component={MapLanding}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginForm}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationForm}
            />
            <PrivateRoute
              path={'/profile'}
              component={Profile}
            />
         </main>
       </Router> 
      </div>
    )
  }
}

export default App