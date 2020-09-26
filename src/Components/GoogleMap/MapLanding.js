import React from 'react';
import NavBar from '../NavBar/NavBar';
import SnapLocationList from '../SnapLocationStores/SnapLocationList';

const MapLanding = () => (
  <div className="page-wrapper">
    <div className="container">
     <NavBar />
      <hr />
    </div>
    <div className="container">
       <SnapLocationList />
    </div>
  </div>
);

export default MapLanding;