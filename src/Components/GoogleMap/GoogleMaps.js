import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { withGoogleMap, GoogleMap } from "react-google-maps";
import Geocode from "react-geocode";

const mapStyles = {
  // left: 0,
  top: 250,
  left: 80,
  width: '90%',
  height: '400px',
  position: 'relative',
  overflow: 'hidden'
};
export class MapContainer extends React.Component {
  state = {
    address: '',
    city: '',
    area: '',
    state: '',
    lat: '',
    lng:'',
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


  componentDidMount() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                mapPosition: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                markerPosition: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
            },
                () => {
                    Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                        response => {
                            console.log(response)
                            const address = response.results[0].formatted_address,
                                addressArray = response.results[0].address_components,
                                city = this.getCity(addressArray),
                                area = this.getArea(addressArray),
                                state = this.getState(addressArray);
                            console.log('city', city, area, state);
                            this.setState({
                                address: (address) ? address : '',
                                area: (area) ? area : '',
                                city: (city) ? city : '',
                                state: (state) ? state : '',
                            })
                        },
                        error => {
                            console.error(error);
                        }
                    );

                })
        });
    } else {
        console.error("Geolocation is not supported by this browser!");
    }
};
getCity = (addressArray) => {
  let city = '';
  for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
          city = addressArray[i].long_name;
          return city;
      }
  }
};

getArea = (addressArray) => {
  let area = '';
  for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
          for (let j = 0; j < addressArray[i].types.length; j++) {
              if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                  area = addressArray[i].long_name;
                  return area;
              }
          }
      }
  }
};

getState = (addressArray) => {
  let state = '';
  for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
          if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
              state = addressArray[i].long_name;
              return state;
          }
      }
  }
};

onChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
};

onInfoWindowClose = (event) => { };

onMarkerDragEnd = (event) => {
  let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

  Geocode.fromLatLng(newLat, newLng).then(
      response => {
          const address = response.results[0].formatted_address,
              addressArray = response.results[0].address_components,
              city = this.getCity(addressArray),
              area = this.getArea(addressArray),
              state = this.getState(addressArray);
          this.setState({
              address: (address) ? address : '',
              area: (area) ? area : '',
              city: (city) ? city : '',
              state: (state) ? state : '',
              markerPosition: {
                  lat: newLat,
                  lng: newLng
              },
              mapPosition: {
                  lat: newLat,
                  lng: newLng
              },
          })
      },
      error => {
          console.error(error);
      }
  );
};

onPlaceSelected = (place) => {
  console.log('plc', place);
  const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

  console.log('latvalue', latValue)
  console.log('lngValue', lngValue)

  // Set these values in the state.
  this.setState({
      address: (address) ? address : '',
      area: (area) ? area : '',
      city: (city) ? city : '',
      state: (state) ? state : '',
      markerPosition: {
          lat: latValue,
          lng: lngValue
      },
      mapPosition: {
          lat: latValue,
          lng: lngValue
      },
  })
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

        <InfoWindow onClose={this.onInfoWindowClose}
        //  position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
        >
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