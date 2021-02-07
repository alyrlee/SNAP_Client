import React, {Component} from 'react';
import config from '../../config';
import snapLocationsList from '../SnapLocationStores/SnapLocationsList';
import MapContainer from '../GoogleMap/GooglePlaces';

export default class MapLanding extends Component {
  constructor(props){
   super(props);
   this.state = { selectedMarker: false, snapLocationsList: [{}]  } ;
  }

  onSelect = async () => {
    const response = await fetch(`${config.API_ENDPOINT}/stores`)
    .then(response => {
      console.log('data', response.json());
      console.log('data 2',response.data.results);
    });
    this.setState({  snapLocationsList: response.data.results});
      console.log('json data', snapLocationsList);
    }

    handleClick = (marker, event) => {
      console.log({ marker })
      this.setState({ selectedMarker: marker })
    }
    render() {
      return (
        <div className="ui container" style={{ marginTop: '26.5px' }}>
        <MapContainer 
          snapLocationsList={this.state.snapLocationsList} 
          onSelect={this.onSelect} 
          Markers = {this.state.snapLocationsList}
          onClick={this.handleClick}
          />  
        </div>
      );
    }
  }
  


  //import React, {Component} from 'react';
// import config from '../../config';
// import snapLocationsList from '../SnapLocationStores/SnapLocationsList';
// import MapContainer from '../GoogleMap/GooglePlaces';


// export default class MapLanding extends Component {
//   constructor(props){
//    super(props);
//    this.state = { data:[], selectedMarker: false,  snapLocationsList: []  } ;
//   }


//   onSelect = async () => {
//     const response = await fetch(`${config.API_ENDPOINT}/stores`)
//     .then(response => {
//       console.log('data', response.json());
//       console.log('data 2',response.data.results);
//     });
//     this.setState({ snapLocationsList: response.data.results});
//       console.log('json data', snapLocationsList);
//     }

//     handleClick = (marker, event) => {
//       // console.log({ marker })
//       this.setState({ selectedMarker: marker })
//     }

//     render() {
//       return (
//         <div className="ui container" style={{ marginTop: '26.5px' }}>
//           <MapContainer
//               snapLocationsList={this.state.snapLocationsList} 
//               onSelect={this.onSelect} 
//               selectedMarker = {this.state.selectedMarker}
//               markers={this.state.snapLocationsList}
//               onClick={this.handleClick}
//             >
//       </MapContainer>
//       </div>
        
//       );
//     }
//   }
  