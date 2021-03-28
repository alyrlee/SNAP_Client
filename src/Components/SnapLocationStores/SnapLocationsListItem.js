import React from "react";

const SnapLocationsListItem = ({ Store_Name }) => {
  console.log("store_name", Store_Name);
  return (
    <li className="list-group-item">
      <div className="store_name-list-item">
        <img className="maps.google-photos" alt="img" />
      </div>
    </li>
  );
};

export default SnapLocationsListItem;
