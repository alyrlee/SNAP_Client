import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import './GoogleMap.css';

const mapStyles = {
  left: 0,
  top:0,
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden'
};
export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <Map
      google={this.props.google}
      initialCenter={{
        lat: 40.854885,
        lng: -88.081807
      }}
      zoom={6}
      style={mapStyles}
      onClick={this.onMapClicked}
    >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU'
})(MapContainer)