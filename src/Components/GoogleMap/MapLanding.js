import React, {Component} from 'react';
import MapContainer from '../GoogleMap/GooglePlaces'; 
import AuthApiService from '../Services/auth-api-service';

export default class MapLanding extends Component {
  constructor(props){
   super(props);
   this.state = {stores: [] } ;
  }

  // onSelect = () => {
  //   const response = fetch(`${config.API_ENDPOINT}/stores`)
  //   .then(response => {
  //     console.log('data', response.json());
  //     console.log('data 2',response.data.results);
  //   });
  //   this.setState({ snapLocationsList: response.data.results,
  //     data: data});
  //     console.log('json data', data);
  //   }

componentDidMount(){
  AuthApiService.getStores()
  .then(resJSON => {
    this.setState({ stores: resJSON});
          console.log('json data', resJSON);
        })
}
   render() {
      return (
        <div className="ui container" style={{ marginTop: '10px' }}>
          {/* <SnapLocationsList stores={this.state.resJSON} /> */}
          {/* Found: {this.state.data.length} SnapLocationsList */}
          <MapContainer 
            stores={this.state.data} 
            // data={stores}
            // onSelect={this.onSelect} 
            markers = {this.state.stores}  
         />  
        </div>
        
         
    );
  }
}

