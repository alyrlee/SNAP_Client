import React from 'react';
import SnapLocationsListItem from './SnapLocationsListItem';

const SnapLocationsList = (props) => {
  const snapLocationsListItem = props.snapLocationsList.map(Store_Name => {
    return <SnapLocationsListItem Store_Name={Store_Name} />
  });
  return   <ul className="col-md-4 list-group"> {snapLocationsListItem} </ul> 
}; 
                       
export default SnapLocationsList;


