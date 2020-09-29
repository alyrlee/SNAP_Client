import React, { Component } from 'react';
import config from '../src/config';
import TokenService from '../src/Components/Services/token-service'
import { Switch, Route } from 'react-router';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Components/LandingPage /LandingPage';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import LoginForm from './Components/LoginForm/LoginForm'
import About from '../src/Components/About/About';
import MapLanding from './Components/GoogleMap/MapLanding'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '', location: '' };
  }
  state  = {
    name: "",
    latitude: "",
    longitude: "",
    address: "",
    city: "",
    area: "",
    state: "",   
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleChange = location => {
    this.setState({ location })
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
  return (
    <main className="App">
    <Switch>
      <Route path='/NavBar' component={NavBar}/> 
     < Route exact path='/' component={RegistrationForm}/> 
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
