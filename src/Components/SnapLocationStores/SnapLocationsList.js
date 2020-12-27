import React from 'react';

const SnapLocationsList = props => {
  const snapLocationsList = props.snapLocationsList.map(Store_Name => {
    return  <ul>{Store_Name&& Store_Name.map(Store_Name => <li key={Store_Name.objectid}>{Store_Name.objectid}</li>)}</ul>;
  });
  return <div className="snapLocationsList">{snapLocationsList}</div>;
}; 
                       
export default SnapLocationsList;
