import React, {Component} from 'react';
import MapContainer from '../GoogleMap/GooglePlaces'; 
// import config from'../../config';
import AuthApiService from '../Services/auth-api-service';
// import snapLocationsList from '../SnapLocationStores/SnapLocationsList';

export default class MapLanding extends Component {
  constructor(props){
   super(props);
  this.state = {stores: [] } ;
  }

componentDidMount(){
  AuthApiService.getStores()
  .then(res => res.json())
  .then(data => {
    this.setState({ stores: data.stores});
    console.log('stores json data', data);
  })
  .catch(console.error)
}

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
         {/* <SnapLocationsList stores={this.state.data} />
        Found: {this.state.data.length} SnapLocationsList */} 
        {/* {this.markerData = resJSON && !error ? resJSON.slice(0, 200): []} */}
        <MapContainer 
          // snapLocationsList={this.state.stores} 
          onSelect={this.onSelect} 
          store = {this.state.data}  
       />  
      </div>
    );
  }
}
