import React, {Component} from 'react';
// import AuthApiService from '../Services/auth-api-service'
import data from './SnapDataShort';
import MapContainer from '../GoogleMap/GooglePlaces';

export default class MapLanding extends Component {
  state = {
     snapLocationsList: [],
     data: data,
     stores: []
    };

  //   componentDidMount(){
  //     AuthApiService.getcityState(state, city)
  //     .then(resJSON => {
  //       this.setState({ stores: resJSON});
  //       console.log('stores json data', resJSON);
  //     })
  //     .catch(error => {
  //       if(error.resJSON)    
  //      console.log(error.resJSON);
  //       console.error({error: error})    
  //   })
  // };

//   onStoresData = () => {
//     let resJSON = [...this.state.resJSON];
//     let sliceresJSON = resJSON.slice(0,50);
//     return sliceresJSON;
  // };
// }
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