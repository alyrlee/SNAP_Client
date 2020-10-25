import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Components/LandingPage /LandingPage';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import LoginForm from './Components/LoginForm/LoginForm';
import About from '../src/Components/About/About';
import MapLanding from './Components/GoogleMap/MapLanding';
import config from '../src/config';
import TokenService from '../src/Components/Services/token-service';
import { Switch, Route } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  } 
  
  componentDidMount() {
    if (!TokenService.getAuthToken()){
      return;
    } 

    //check endpoint if it should be users v. stores
    if (!TokenService.hasAuthToken) {
      fetch(`${config.API_ENDPOINT}/users`,{
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
      .then(users => {
        this.setState({users});
      })
      .catch(error => {
        console.error({error});
      });
    }
  }
    

  render() {
    return (
      <main className="App">
        <Switch>
          <Route path='/NavBar' component={NavBar}/> 
          <Route exact path='/registration' component={RegistrationForm}/> 
          <Route exact path= '/home' component={LandingPage}/>
          <Route exact path='/about' component={About}/> 
          <Route path='/login' component={LoginForm}/>
          <Route path='/find' component={MapLanding}/>
        </Switch> 
      </main>
    );
  }
}

export default App;
