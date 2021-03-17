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
import { Route, Switch} from "react-router-dom";
import config from './config';

class App extends Component {
  state = {
     hasError: false,
     snapLocationsList: [],
     user: [] 
    };

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
		Promise.all([
			fetch(`${config.API_ENDPOINT}/auth`),
      fetch(`${config.API_ENDPOINT}/stores`),
      fetch(`${config.API_ENDPOINT}/profile`),
			fetch(`${config.API_ENDPOINT}/savedLocations`)
		])
			.then(([userRes, snapLocationsListRes]) => {
				if (!userRes.ok)
					return snapLocationsListRes.json().then(e => Promise.reject(e));
				if (!snapLocationsListRes.ok)
					return snapLocationsListRes.json().then(e => Promise.reject(e));

				return Promise.all([userRes.json(), snapLocationsListRes.json()]);
			})
			.then(([user, snapLocationsList]) => {
				this.setState({user, snapLocationsList});
			})
			.catch(error => {
				console.error({error});
			});
	}

	handleGetSnapLocations = ObjectId => {
			this.setState({
					snapLocationsList: this.state.snapLocationsList.filter(snapLocationsList => Object.Id !== ObjectId)
			});
	};

	handleGetAllUserProfiles = (user) => {
	this.setState({
		user: [...this.state.user, user]
	});
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
          </Switch>
        </main>
      </div>
    )
  }
}

export default App