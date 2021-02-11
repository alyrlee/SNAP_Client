import React, {Component} from 'react';
import config from '../../config';
import snapLocationsList from '../SnapLocationStores/SnapLocationsList';
import MapContainer from '../GoogleMap/GooglePlaces'; 

const testData =[
  {
    X: -71.0622020,
    Y: 42.36492920,
    objectid: 4030,
    store_name: '7-eleven 32476C',
    address: '91 Causeway St',
    city: 'Boston',
    state: 'MA'  
  },
  {
    X: -71.075058,
    Y: 42.337936,
    objectid: 4031,
    store_name: '8-eleven 32476C',
    address: '93 Causeway St',
    city: 'Boston',
    state: 'MA'  
  },
  {
    X: -71.054825,
    Y: 42.340183,
    objectid: 4031,
    store_name: '7-eleven 32476C',
    address: '95 Causeway St',
    city: 'Boston',
    state: 'MA'  
  },
];

export default class MapLanding extends Component {
  constructor(props){
   super(props);
   this.state = { selectedMarker: false,  data: [], snapLocationsList: []  } ;
  }



//   onSelect = async () => {
//     const response = await fetch(`${config.API_ENDPOINT}/stores`)
//     .then(response => {
//       console.log('data', response.json());
//       console.log('data 2',response.data.results);
//     });
//     this.setState({ data: response.data.results });
//   }
//     render() {
//       return (
//           <MapContainer>
//             {
//             data.map(item => {
//               return (
//               <Marker key={item.store_name} position={item.data}/> ) })
//     </MapContainer>
//onSelect for backend db
onSelect =  () => {
      const response = fetch(`${config.API_ENDPOINT}/stores`)
      .then(response => {
        console.log('data', response.json());
        console.log('data 2',response.data.results);
      });
      this.setState({ snapLocationsList: response.data.results});
        console.log('json data', snapLocationsList);
}

    render() {
      return (
        <div className="ui container" style={{ marginTop: '26.5px' }}>
        <MapContainer 
          snapLocationsList={this.state.snapLocationsList} 
          data={testData}
          //for db fetch  
          //data={this.state.data}
          onSelect={this.onSelect} 
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
  