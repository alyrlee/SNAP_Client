import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
// import SearchBox from '../SearchBox/SearchBox';

const mapStyles = {
  width: "60%",
  height: "48%"
};
export class MapContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 41.8781,
          lng: -87.6298
        }}
        onClick={this.onMapClicked}
      >
        <Marker
         position={{ lat: 41.8781, lng: -87.6298 }}
         title ={"SNAP Map"}
        />
           {this.props.snapLocationsList.map(SLL=> {
      return (
        <Marker
          key={SLL.store_name}
          label={SLL.name}
          position={{ lat: SLL.latitude, lng: SLL.longitude }}
             />
      // <SearchBox />        


          );
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU"
 })(MapContainer);
