import React, {Component} from 'react';
import config from '../../config';
import data from './SnapDataShort';
import MapContainer from '../GoogleMap/GooglePlaces';

export default class MapLanding extends Component {
  state = {
     snapLocationsList: [],
     data: data,
    };

    onSelect = () => {
      const response =  fetch(`${config.API_ENDPOINT}/stores`)
      .then(response => {
        console.log('data', response.json());
        console.log('data 2',response.data.results);
      });
      this.setState({ snapLocationsList: response.data.results,
      data: data});
      console.log('json data', data);
    }
    render() {
      return (
        <div className="ui container" style={{ marginTop: '10px' }}>
          {/* <SnapLocationsList stores={this.state.data} />
          Found: {this.state.data.length} SnapLocationsList */}
          <MapContainer 
            snapLocationsList={this.state.data} 
            // onSelect={this.onSelect} 
            Markers = {this.state.data}
            
         />  
        </div>
      );
    }
  }

   