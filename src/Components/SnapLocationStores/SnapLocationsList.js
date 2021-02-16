import React from 'react';
import SnapLocationsListItem from './SnapLocationsListItem';

const SnapLocationsList = (props) => {
  const snapLocationsListItem = props.snapLocationsList.array.map(Store_Name => {
    // snapLocationsList = (stores) => (
    //   <ul>{stores && stores.map(Store_Name => <li key={Store_Name.objectid}>{Store_Name.objectid}</li>)}</ul>
    // );
    return <SnapLocationsListItem key={Store_Name} Store_Name={Store_Name} />

  });
  return   <ul className="col-md-4 list-group"> {snapLocationsListItem} </ul> 
}; 
                       
export default SnapLocationsList;
