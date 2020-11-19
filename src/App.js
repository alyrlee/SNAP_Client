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
// import config from '../src/config';
// import TokenService from '../src/Components/Services/token-service';
import { Route, Switch} from "react-router-dom";

class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className='App'>
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
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
            {/* <Route
              component={NotFoundPage}
            /> */}
          </Switch>
        </main>
      </div>
    )
  }
}

export default App