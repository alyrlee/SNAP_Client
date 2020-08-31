import React from 'react';
import NavBar from '../NavBar/NavBar';
import LocationSearchModal from './GooglePlaces';
// import MapContainer from './GoogleMaps'
// import MapWithASearchBox from './GoogleMaps';

const MapLanding = () => (
  <div className="page-wrapper">
    <div className="container">
     <NavBar />
      <hr />
    </div>
    <div className="container">
    <LocationSearchModal />  
       {/* <MapContainer /> */}
    </div>
  </div>
);

export default MapLanding;