import React, {Component} from 'react';
import MapContainer from '../GoogleMap/GooglePlaces';
import SnapLocationsList from '../SnapLocationStores/SnapLocationsList';

export default class MapLanding extends Component {
  state = {
     snapLocationsList: [],
     stores: []
    };

    render() {    
      return (
        <div>
          <SnapLocationsList stores={this.state.snapLocationsList} />
          {/* Found: {this.state.snapLocationsList.length} SnapLocationsList */}
          <MapContainer 
            snapLocationsList={this.state.snapLocationsList} 
            onSelect={this.onSelect} 
            markers = {this.state.snapLocationsList}
         />  
        </div>
      );
    }
  }