import React, {Component} from 'react';
import config from '../../config';
import snapLocationsList from '../SnapLocationStores/SnapLocationsList';
import MapContainer from '../GoogleMap/GooglePlaces';
import data from '../Data/snapData.json';

// import UserSavedLocations from '../UserSavedLocationsForm/UserSavedLocations';

export default class MapLanding extends Component {
  constructor(props){
   super(props);
   this.state = { data: [], snapLocationsList: []  } ;
  }

  onSelect = async () => {
    const response = await fetch(`${config.API_ENDPOINT}/stores`)
    .then(response => {
      console.log('data', response.json());
      console.log('data 2',response.data.results);
    });
    this.setState({ data, snapLocationsList: response.data.results});
      console.log('json data', snapLocationsList);
    }
    render() {
      return (
        <div className="ui container" style={{ marginTop: '10px' }}>
        <MapContainer 
          snapLocationsList={this.state.snapLocationsList} 
          onSelect={this.onSelect} 
          Markers = {this.state.snapLocationsList}
          />  
        {/* <UserSavedLocations />   */}
        </div>
      );
    }
  }
  