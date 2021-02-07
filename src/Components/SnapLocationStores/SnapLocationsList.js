import React from 'react';
import SnapLocationsListItem from './SnapLocationsListItem';

const SnapLocationsList = (props) => {
  const snapLocationsListItem = props.snapLocationsList.array.map(Store_Name => {
    // return <SnapLocationsListItem key={SLL.Store_Name} Store_Name={Store_Name} />
    // snapLocationsList = (stores) => (
    //   <ul>{stores && stores.map(Store_Name => <li key={Store_Name.objectid}>{Store_Name.objectid}</li>)}</ul>
    // );
    return <SnapLocationsListItem key={Store_Name} Store_Name={Store_Name} />

  });
  return   <ul className="col-md-4 list-group"> {snapLocationsListItem} </ul> 
}; 
                       
export default SnapLocationsList;


//allow load place and configure search to load snap locations
//snapLocationsList is an object that contains an array of store information to display to the user as markers on the google map.
//pass snapLocationsList as a prop
//make request to API to get store location data, pass via component 

// snapLocationsList = (stores) => (
//   <ul>{stores && stores.map(Store_Name => <li key={Store_Name.objectid}>{Store_Name.objectid}</li>)}</ul>
// );
//(stores) => {
   //this.setState({ stores: stores});
   // key prop same variable name??