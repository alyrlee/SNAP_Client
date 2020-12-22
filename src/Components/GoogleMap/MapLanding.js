// import React, { useEffect, useState, Component } from 'react';
// import config from '../../config';

// export default class MapLanding extends Component {
//    snapLocationsList = () => {
//     const [SnapLocationsList, setSnapLocationsList] = useState([]);
  
//     useEffect(() => {
//       getSnapLocationsList();
//     }, []);
  
//     async function getSnapLocationsList() {
//       const response = await fetch(`${config.API_ENDPOINT}/stores`);
//       const snapLocationsList = await response.json();
//       setSnapLocationsList(snapLocationsList);
//       console.log('data', response.json());
//     }
  
//     // render() {
//       console.log('ML SLL: ', this.state.snapLocationsList);
//       return ( 
//         <div className="page-wrapper">
//           <div className="container">
//          <SnapLocationsList />           
//           </div>
//         </div>
//       );
//     };
//   }







// //   static contextType = snapLocationsListContext
//   // constructor(props) {
//   //  super();
//   //   this.state = { 
//   //     type: null, 
//   //     snapLocationsList: {},
//   //   };
//   // }

//   // componentDidMount() {
//   //   fetch(`${config.API_ENDPOINT}/stores`)
//   //     .then(response => {
//   //       console.log('About to check for errors');
//   //       if(!response.ok) {
//   //         console.log('An error did occur, let\'s throw an error.');
//   //         console.log(response);
//   //         throw new Error('Something went wrong');
//   //       }
//   //       return response; 
//   //     })
//   //     .then(response => response.json())
//   //     .then(data => {
//   //       const snapLocationsList = Object.keys(data)
//   //             .map(key => data[key].item[0]);
//   //       this.setState({
//   //         snapLocationsList: snapLocationsList
//   //       });
//   //     })
//   //     .catch(err => {
//   //       console.log('Handling the error here.', err);
//   //     });
//   // }
// // //onSubmitSearch
// //   // onClick = event => {
// //   //   this.setState(
// //   //     {
// //   //       type: event.target.ObjectId
// //   //     },
// //   //     () => {
// //   //       this.getSnapLocations();
// //   //     }
// //   //   );
// //   // };
 


