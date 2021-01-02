import React, {Component} from 'react';
import config from '../../config';
// import data from  './SnapData';
import data from './SnapDataShort';
import SnapLocationsList from '../SnapLocationStores/SnapLocationsList';
import MapContainer from '../GoogleMap/GooglePlaces';

export default class MapLanding extends Component {
  state = {
     snapLocationsList: [],
     data: data,
    //  obj/value pair can be set in state w/ this syntax. Use case: when have the same name    
    };

    onSelect = async () => {
    const response = await fetch(`${config.API_ENDPOINT}/stores`)
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

    //manipulate based upon how data is returned
    //ex: 
    // const data =[
      //     {
      //       // x   |     y      | objectid |                     store_name                     |                address                | address_line__2 |  city  | state | zip5 | zip4 | county  |  longitude  |  l
      //       // -71.0622020 | 42.3649290 |     4030 | 7-eleven 32476C                                    | 91 Causeway St                        | 91-99           | Boston | MA    | 2114 | 1308 | SUFFOLK | -71.0622020 | 42.3649290 | 2020-12-15 02:22:00-05
      //       X: -71.0622020,
      //       Y: 42.36492920,
      //       objectid: 4030,
      //       store_name: '7-eleven 32476C',
      //       address: '91 Causeway St',
      //       city: 'Boston',
      //       state: 'MA'  
      //     },
      //     {
      //       // x   |     y      | objectid |                     store_name                     |                address                | address_line__2 |  city  | state | zip5 | zip4 | county  |  longitude  |  l
      //       // -71.0622020 | 42.3649290 |     4030 | 7-eleven 32476C                                    | 91 Causeway St                        | 91-99           | Boston | MA    | 2114 | 1308 | SUFFOLK | -71.0622020 | 42.3649290 | 2020-12-15 02:22:00-05
      //       X: -71.0622021,
      //       Y: 42.36492922,
      //       objectid: 4031,
      //       store_name: '8-eleven 32476C',
      //       address: '93 Causeway St',
      //       city: 'Boston',
      //       state: 'MA'  
      //     }
      //   ]


