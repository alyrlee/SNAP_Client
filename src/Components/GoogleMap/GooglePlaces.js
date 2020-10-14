import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
  position: 'relative',
};
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      fields: "",
      places: [], 
    };
  } 
  onMapReady = (map) => this.searchNearby(map, map.center);

  searchNearby = (map, center) => {
    const { google } = this.props;

    const service = new google.maps.places.PlacesService(map);

    // Specify location, radius and place types for your Places API search.
    const request = {
      location: center,
      radius: '500',
      type: ['stores']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK)
        this.setState({ places: results });
    });
  };

  render() {
    ///type js here, before the return 
    console.log(this.props.snapLocationsList);
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 41.8781,
          lng: -87.6298
        }}
        // onClick={this.onMapClicked}
        onReady={this.onMapReady}
        visible={false}>  
        {/* <Listing places={this.state.places} /> */}
        <Marker
          position={{ lat: 41.8781, lng: -87.6298 }}
          title ={"SNAP Map"}
        />
        {this.props.snapLocationsList.map(SLL=> {
          return (
            <Marker
              key={SLL.Store_Name}
              label={SLL.name}
              position={{ lat: SLL.latitude, lng: SLL.longitude }}
            />
          );
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU"
 })(MapContainer);
