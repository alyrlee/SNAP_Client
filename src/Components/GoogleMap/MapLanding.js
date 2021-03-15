import React, {Component} from 'react';
import PlacesAutocomplete from '../GoogleMap/GooglePlaces'; 
// import config from'../../config';
import AuthApiService from '../Services/auth-api-service';
// import snapLocationsList from '../SnapLocationStores/SnapLocationsList';

export default class MapLanding extends Component {
  constructor(props){
   super(props);
  this.state = {stores: [] } ;
  }

componentDidMount(city, state){
AuthApiService.postCityState(city, state)
    .then(resJSON => {
      this.setState({ stores: resJSON});
      console.log('city/state stores json data', resJSON);
    })
    .catch(error => {
      if(error.resJSON)    
     console.log(error.resJSON);
      console.error({error: error})    
  })}

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
         {/* <SnapLocationsList stores={this.state.data} />
        Found: {this.state.data.length} SnapLocationsList */} 
        {/* {this.markerData = resJSON && !error ? resJSON.slice(0, 200): []} */}
        <PlacesAutocomplete
          // snapLocationsList={this.state.stores} 
          onSelect={this.onSelect} 
          store = {this.state.data}  
       />  
      </div>
    );
  }
}
