import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
Geocode.setApiKey("AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU");
Geocode.enableDebug();

const mapStyles = {
  top: "5px",
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  state = {
    term: '',
    snapLocationsList: {},
    places: [],
    showingInfoWindow: true,
    activeMarker: {},
    selectedPlace: {},
    stores: {},
    address: '',
    city: '',
    area: '',
    state: '',
    markerPosition: {
      lat: 0,
      lng: 0
    },
    mapPosition: {
        lat: 0,
        lng: 0
    },     
    coordinates: {
        lat: 42.3600825,
        lng: -71.0588801
    },  
    cambridgeCoordinates: {
      lat: 42.373611,
      lng: -71.110558
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
                            console.log(response);
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

onChange = (event) => { event.preventDefault();
  this.props.onChange(this.state.term);
};

onInfoWindowClose = (props) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};
onInfoWindowOpen =(props) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: true,
      activeMarker: null
    });
  }
};

// onMarker.addListener("click", () => {
//   infowindow.open(map, marker);
// });


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
  
onPlaceSelected = ( place ) => {
    console.log('plc', place);
    const {geometry} = place;
    if (geometry) {
      const {location} = place.geometry;
    if (location) {
        this.setState({
          coordinates: {
            lat: location.lat(), 
            lng: location.lng()
          }
        });
      }
    }
  }

  onMarkerClick = (props, marker, _e) => {
    if (this.state.marker) {
      this.setState({
        selectedPlace: props,
        selectedMarker: props,
        snapLocationsList: props,
        activeMarker: marker,
        showingInfoWindow: true
      })
    }
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: true,
        activeMarker: null
      })
    }
  };
    
  createMarker = (coords) => {
    console.log(coords);
    return (
      <Marker 
        key={`${coords.lat}${coords.lng}`}
        google={this.props.google}
        onClick={this.onMarkerClick}
        position={{ lat: coords.lat, lng: coords.lng }}
        name={'Current Location'}
        draggable={true}
        onDragEnd={this.onMarkerDragEnd}
      >
         {/* {this.props.selectedMarker === marker &&
        <InfoWindow>
          <div>
            {marker.snapLocationsList}

          </div>
        </InfoWindow>} */}
      </Marker>  
    )

  } 
  render() {
    if (!this.props.loaded) return <div>Loading...</div>;
    console.log(this.props.snapLocationsList);
    console.log('ML SLL:', this.state.snapLocationsList);
    return (
      <Map
           key={this.state.coordinates.lat+this.state.coordinates.lng} 
           google={this.props.google}
           zoom={12}
           style={mapStyles}
           initialCenter={
            {
              lat: this.state.coordinates.lat,
              lng: this.state.coordinates.lng
            }
          }
            onClick={this.onMapClicked}
            onReady={this.onMapReady} 
            stores ={this.state.stores} 
            // visible={false}
      >
      {this.createMarker(this.state.cambridgeCoordinates)}  
      {console.log('give me data', this.props.data)}
      {this.props.data.map(mark => this.createMarker({lat: mark.X, lng: mark.Y}))} 
      {this.props.data. map(mark => this.createMarker({name: mark.store_name}))} 
      {this.props.data.map(mark => this.createMarker({address: mark.address}))} 
      {this.props.data.map(mark => this.createMarker({city: mark.city}))} 
      <Marker
            onClick={this.onMarkerClick}     
            name={'store_name'}
            // position={{ lat: this.state.coordinates.latitude, lng: this.coordinates.longitude }}
            >   
      </Marker>
      {/* <Marker 
            // key={marker.id}/{place..id}
            google={this.props.google}
            onClick={this.onMarkerClick}
            // position={{ lat: marker.lat, lng: this.state.markerPosition.lng }}
            name={'Current location'}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
          >
               {this.props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.snapLocationsList}

                </div>
              </InfoWindow>}
          </Marker>   */}

      <Autocomplete
           placeholder='Search'
           fields= {['']}
           ref={input => this.search = input}
           input id="searchTextField"
           style={{
              width: '100%',
              height: '25px',
              paddingLeft: '16px',
              // marginTop: '2px',
              marginBottom: '100px'
            }}
           onPlaceSelected={ this.onPlaceSelected }
           types={['(cities)']}
           componentRestrictions={{country: 'us'}}
           onChange={e => this.setState({ term: e.target.value })}
           term={{
              key: 'AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU',
              language: 'en'
              // search: 'value'
          }}
      />    
        <InfoWindow
            marker={this.state.activeMarker}
            onOpen={this.onInfoWindowOpen}
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU"
  // `${process.env.API_KEY}`
})(MapContainer);
