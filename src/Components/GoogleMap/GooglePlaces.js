import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Autocomplete from 'react-google-autocomplete';
import AuthApiService from '../Services/auth-api-service'
import Geocode from 'react-geocode';
Geocode.setApiKey("AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU");
Geocode.enableDebug();

export class MapContainer extends Component {
  state = {
    query: '',
    input: '',
 
    SnapLocationsList: {},
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
    mapCenter: {
      lat: 42.3600825,
      lng: -71.0588801
    },    
    coordinates: {
        lat: 42.3600825,
        lng: -71.0588801
    }  
  };
 
  componentDidMount() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
              // mapCenter: {
              //   lat: position.mapCenter.latitude,
              //   lng: position.mapCenter.longitude
              // },   
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
                            console.log('geocode response', response)
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
                            })
                            console.log('city', city);
                            console.log('state', state);
                            console.log('call getStoresByCityState?', city, state)
                            this.getStoresByCityFromAPI(city, state);    
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

  getStoresByCityFromAPI = (city, state) => {
    console.log('passing the city/state data to the backend!', city, state)
    AuthApiService.postCityState(city, state)
    .then(resJSON => {
      this.setState({ cityStores: resJSON});
      console.log('city/state stores json data', resJSON);
    })
    .catch(error => {
      if(error.resJSON)    
     console.log(error.resJSON);
      console.error({error: error})    
  })
  }

  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'locality' === addressArray[i].types[0]) {
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
                state = addressArray[i].short_name;
                return state;
            }
        }
    }
  };

onChange = (event) => { event.preventDefault();
  this.props.onChange(this.state.data);
};

//check if should be terms

// handleInputChange = (event) => { event.preventDefault();
//   this.props.handleInputChange(this.state.input);
// console.log('input', input);
// };


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
                cityStores: {
                city: city,
                state: state 
                },    
            })
        },
        error => {
            console.error(error);
        }
    );
  };
  
  onPlaceSelected = ( place, markers ) => {
    console.log('plc -> on selected', place);
    // check compDidMount is working first before you fix this! 
    const city = place.address_components[0].long_name;
    const state = place.address_components[2].short_name;
    this.getStoresByCityFromAPI(city, state);
    console.log('updated city, state by current user search submission', city, state);
    const {geometry} = place;
      if (geometry) {
        const {location} = place.geometry;
      if (location) {
        this.setState({
          mapCenter: {
            lat: location.lat(), 
            lng: location.lng(),
            // cityStores: {
            //   city: city,
            //   state: state 
          },
        });
      }
    }
  }

  // handleInputChange(event) {
  //   this.setState({
  //     input: event.target.value
  //   })
  // }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  createMarker = (cityStores) => {
    console.log('pull all snap data locations', cityStores);
    return (
      <Marker 
        key={`${cityStores.latitude}${cityStores.longitude}`}
        id={cityStores.ObjectId}
        onClick={this.onMarkerClick}
        position={{ lat: cityStores.latitude, lng: cityStores.longitude }}
        name={'Current Location'}
        title={cityStores.Store_Name}
         />
    ) 
  }

  render() {
    // if (!this.props.loaded) return <div>Loading...</div>;
    // console.log('data loading', this.props.snapLocationsList);
    console.log('ML SLL:', this.state.cityStores);
    console.log('ML SLL UPDATE:', this.state.places.PlaceResult);

    return (
  <Map google={this.props.google}
        //  style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={14}
        initialCenter={{
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lng
        }}
        center={{
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lng
        }}
           >
  <Autocomplete
        input id='autocomplete'
        type='text'
        placeholder='Search'
        fields= {['address_components', 'formatted_address', 'place_id', 'geometry']}
        // fields={['']}
        style={{
            width: '100%',
            height: '25px',
            paddingLeft: '16px',
            // marginTop: '2px',
            marginBottom: '100px'
        }}
        onPlaceSelected={ this.onPlaceSelected }
        types={['(cities)']}
        // input={value.toString()}
        value={this.state.input}
        componentRestrictions={{country: 'us'}}
        onChange={e => this.setState({ input: e.target.value })}
        onClick={(places, cityStores, details = null) => {
          console.log('stores and details!!', places, cityStores, details);
        }}
        terms={{
            key: 'AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU',
            language: 'en',
            input: 'value',
        }}
          />        
  {this.props.markers && this.props.markers.map(cityStores => this.createMarker(cityStores))}
  <Marker
        cityStores={this.props.cityStores}
        // title={this.place.name}
        name={'Store_Name'}
        // position={this.onPlaceSelected}
          />
  <Marker
        name={'Your position'}
        position={{
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lng
        }} />
     <InfoWindow
        marker={this.state.activeMarker}
        onOpen={this.windowHasOpened}
        onClose={this.windowHasClosed}
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
  // `${API_KEY}`
})(MapContainer);
