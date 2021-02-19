import React, {Component} from 'react';
import MapContainer from '../GoogleMap/GooglePlaces'; 
// import config from'../../config';
import AuthApiService from '../Services/auth-api-service';
import snapLocationsList from '../SnapLocationStores/SnapLocationsList';

export default class MapLanding extends Component {
  constructor(props){
   super(props);
  //  this.state = {data: {}, snapLocationsList: [], stores: [],error: null } 
  this.state = {stores: [] } ;
  }

  // onSelect = () => {
  //   const resJSON = fetch(`${config.API_ENDPOINT}/stores`)
  //   .then(resJSON => {
  //     console.log('data', resJSON());
  //     console.log('data 2',resJSON.data.results);
  //   });
  //   this.setState({ snapLocationsList: resJSON.data.results,
  //     data: resJSON.data.results});
  //     console.log('json data', resJSON());
  //   }


// componentDidMount() {
//   AuthApiService.getStores()
//       .then(resJSON => {
//         console.log('data', resJSON());
//         console.log(resJSON.data.results)
//           this.setState({
//               snapLocationsList: resJSON.data.results,
//               data: resJSON.data.results
//           })
//       })
//       .catch(error => {
//         console.log(error)
//       })
// }
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
        {/* {this.markerData = resJSON && !error ? resJSON.slice(0, 200): []} */}
        <MapContainer 
          // snapLocationsList={this.state.resJSON} 
          // onSelect={this.onSelect} 
          // markerData = {this.state.stores.resJSON}  
       />  
      </div>
    );
  }
}
