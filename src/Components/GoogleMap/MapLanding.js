import React, { Component } from 'react';
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import SnapLocationsList from '../SnapLocationStores/SnapLocationsList';

class MapLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {snapLocationLists: []};
  }

  onClick = event => {
    this.setState(
      {
        type: event.target.ObjectId
      },
      () => {
    this.getSnapLocations();
  }
);
  };

getSnapLocations = () => {
    if (this.state.snapLocationList);
  axios.get(`http://localhost:8000/api/stores?`)
   .then(responseFromApi => {
    this.setState({
      SnapLocationList: responseFromApi.data
    });
  });
}

render() {
   return (
<div className="page-wrapper">
    <div className="container">
     <NavBar />
      <hr />
    </div>
    <div className="container">
       <SnapLocationsList />
    </div>
  </div>
  );
 }
}

export default MapLanding;