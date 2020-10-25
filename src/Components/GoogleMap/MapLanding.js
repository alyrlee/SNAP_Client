// import React, { Component } from 'react';
// import NavBar from '../NavBar/NavBar';
// import SnapLocationsList from '../SnapLocationStores/SnapLocationsList';
// import config from '../../config'
// import snapLocationsListContext from '../../snapLocationsListContext';

// class MapLanding extends Component {
//   static contextType = snapLocationsListContext
//   constructor(props) {
//     super(props);
//     this.state = { 
//       type: null, 
//       snapLocationsList: {},
//     };
//   }
//   componentDidMount() {
//     fetch(`${config.API_ENDPOINT}/stores`)
//       // if (this.state.snapLocationList) {
//       .then(response => {
//         console.log('About to check for errors');
//         if(!response.ok) {
//           console.log('An error did occur, let\'s throw an error.');
//           console.log(response);
//           throw new Error('Something went wrong');
//         }
//         return response; 
//       })
//       .then(response => response.json())
//       .then(data => {
//         const snapLocationsList = Object.keys(data)
//               .map(key => data[key].item[0]);
//         this.setState({
//           // snapLocationsList: snap_locations
//         });
//       })
//       .catch(err => {
//         console.log('Handling the error here.', err);
//       });
//   }
// //onSubmitSearch
//   // onClick = event => {
//   //   this.setState(
//   //     {
//   //       type: event.target.ObjectId
//   //     },
//   //     () => {
//   //       this.getSnapLocations();
//   //     }
//   //   );
//   // };
 

//   render() {
//     /////
//     console.log('ML SLL: ', this.state.snapLocationsList);
//     return ( 
//       <div className="page-wrapper">
//         <div className="container">
//         <NavBar />
//           <hr />
//         </div>
//         <div className="container">
//           <SnapLocationsList snapLocationsList={this.state.snapLocationsList} />
//           {/* pass info via props */}
//         </div>
//       </div>
//     );
//   }
// }

// export default MapLanding;