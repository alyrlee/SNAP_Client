import React from 'react';
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
<<<<<<< HEAD
import { Route, Router } from "react-router-dom";
import history from './Contexts/history';

function App() {
=======
// import MapContainer from './Components/GoogleMap/GooglePlaces'
// import config from '../src/config';
// import TokenService from '../src/Components/Services/token-service';
import { Route, Switch} from "react-router-dom";

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

  // componentDidMount() {
	// 	Promise.all([
	// 		fetch(`${config.API_ENDPOINT}/auth`),
  //     fetch(`${config.API_ENDPOINT}/stores`),
  //     fetch(`${config.API_ENDPOINT}/profile`),
	// 		fetch(`${config.API_ENDPOINT}/savedLocations`)
	// 	])
	// 		.then(([userRes, snapLocationsListRes]) => {
	// 			if (!userRes.ok)
	// 				return snapLocationsListRes.json().then(e => Promise.reject(e));
	// 			if (!snapLocationsListRes.ok)
	// 				return snapLocationsListRes.json().then(e => Promise.reject(e));

	// 			return Promise.all([userRes.json(), snapLocationsListRes.json()]);
	// 		})
	// 		.then(([user, snapLocationsList]) => {
	// 			this.setState({user, snapLocationsList});
	// 		})
	// 		.catch(error => {
	// 			console.error({error});
	// 		});
	// }

	// handleGetSnapLocations = ObjectId => {
	// 		this.setState({
	// 				snapLocationsList: this.state.snapLocationsList.filter(snapLocationsList => Object.Id !== ObjectId)
	// 		});
	// };

	// handleGetAllUserProfiles = (user) => {
	// this.setState({
	// 	user: [...this.state.user, user]
	// });
	// }
    
  render() {
>>>>>>> newGMaps
    return (
      <div className='App'>
    <Router history={history}>
        <header className="ui container">
          <Header />
        </header>
            <Route path={'/'} exact component={LandingPage}/>
            <Route path={'/about'} exact component={About} />
            <Route path={'/find'} exact component={MapLanding}/>
            <PublicOnlyRoute path={'/login'} component={LoginForm}/>
            <PublicOnlyRoute path={'/register'} component={RegistrationForm}/>
            <PrivateRoute path={'/profile'} exact component={Profile}/>
       </Router> 
      </div>
    );
  }

export default App;