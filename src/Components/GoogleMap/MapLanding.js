import React, {Component} from 'react';
// import config from '../../config';
import AuthApiService from '../Services/auth-api-service'
import data from './SnapDataShort';
import MapContainer from '../GoogleMap/GooglePlaces';

export default class MapLanding extends Component {
  state = {
     snapLocationsList: [],
     data: data,
     stores: []
    };

    // 
    componentDidMount(){
      AuthApiService.getStores()
      .then(resJSON => {
        this.setState({ stores: resJSON});
        console.log('stores json data', resJSON);
            })
    }
    render() {
      return (
        <div className="ui container" style={{ marginTop: '10px' }}>
          {/* <SnapLocationsList stores={this.state.data} />
          Found: {this.state.data.length} SnapLocationsList */}
          <MapContainer 
            snapLocationsList={this.state.data} 
            // onSelect={this.onSelect} 
            markers = {this.state.data}
            stores = {this.state.stores}
            
         />  
        </div>
      );
    }
  }

   