import React from 'react';

const SnapLocationsList = props => {
  const snapLocationsList = props.snapLocationsList.map(Store_Name => {
    return <div key={objectid.Store_Name}/>;
  });
  return <div className="snapLocationsList">{snapLocationsList}</div>;
}; 
                       
export default SnapLocationsList;
