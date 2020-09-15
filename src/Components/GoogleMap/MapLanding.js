import React from 'react';
import NavBar from '../NavBar/NavBar';
import Map from './GooglePlaces'


const MapLanding = () => (
  <div className="page-wrapper">
    <div className="container">
     <NavBar />
      <hr />
    </div>
    <div className="container">
       <Map  /> 
    </div>
  </div>
);

export default MapLanding;