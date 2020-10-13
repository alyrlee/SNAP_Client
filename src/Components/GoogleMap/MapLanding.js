import React, { Component } from 'react';
import axios from "axios";
import NavBar from '../NavBar/NavBar';
import SnapLocationsList from '../SnapLocationStores/SnapLocationsList';
import snap_locations from '../../dummy-store';

class MapLanding extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      type: null, 
      snapLocationsList: {}
    };
  }

  componentDidMount() {
    //this will be called once, when the component is initialized
    // uncomment this to test that the backend api is working 
    this.getSnapLocations();
    console.log('ML SL dummy: ', snap_locations);
    this.setState({snapLocationsList: snap_locations});
  }
//onSubmitSearch
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
    // and empty array evaluates to truthy, not falsely! 
    // https://brianflove.com/2014-09-02/whats-the-double-exclamation-mark-for-in-javascript/
    // if (this.state.snapLocationList) {
      axios.get(`http://localhost:8001/api/stores`)
      .then(responseFromApi => {
        this.setState({
          SnapLocationsList: responseFromApi.data
        });
      });
    // };
  }

  render() {
    /////
    console.log('ML SLL: ', this.state.snapLocationsList);
    return ( 
      <div className="page-wrapper">
        <div className="container">
        <NavBar />
          <hr />
        </div>
        <div className="container">
          <SnapLocationsList snapLocationsList={this.state.snapLocationsList} />
          {/* pass info via props */}
        </div>
      </div>
    );
  }
}

export default MapLanding;