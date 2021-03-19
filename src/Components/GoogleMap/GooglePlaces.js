import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Autocomplete from 'react-google-autocomplete';
import AuthApiService from '../Services/auth-api-service'
import Geocode from 'react-geocode';
Geocode.setApiKey("AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU");
Geocode.enableDebug();

export class MapContainer extends Component {
  state = {
    places: [],
    showingInfoWindow: true,
    activeMarker: {},
    selectedPlace: {},
    stores: {},
    cityStores:[{}],
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
      console.log('  ~~~  --> city/state stores json data', resJSON);
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
  
  onPlaceSelected = ( place ) => {
    console.log('plc -> on selected', place);
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
          },
            cityStores: {
              city: city,
              state: state 
          },
        });
      }
    }
  }

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

  createMarkers = () => {
    const markers = this.state.cityStores.city.map((store) => {
      return <Marker key={`${store.latitude}${store.longitude}`} id={store.ObjectId} name={store.Store_Name} title={store.Store_Name} position={{ 
       lat: store.latitude, 
       lng: store.longitude 
       }}
       onClick={() => console.log("You clicked me!")} />
     })
     
    // let's see if we are getting an array of Markers
    console.log(markers);
    return markers;
   }

    
  render() {
    // if (!this.props.loaded) return <div>Loading...</div>;
    // console.log('data loading', this.props.snapLocationsList);
    console.log('ML SLL state cityStores:', this.state.cityStores);

    return ( 
  <Map google={this.props.google}
        // style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={13}
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
        style={{
            width: '100%',
            height: '25px',
            paddingLeft: '16px',
            marginBottom: '100px'
        }}
        onPlaceSelected={ this.onPlaceSelected }
        types={['(cities)']}
        // input={value.toString()}
        value={this.state.input}
        componentRestrictions={{country: 'us'}}
        onChange={e => this.setState({ input: e.target.value })}
        onClick={(places, details = null) => {
          console.log('stores and details!!', places, details);
        }}
        terms={{
            key: 'AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU',
            language: 'en',
            input: 'value',
        }}
          /> 
  {/* <Marker/> */}
<Marker position={{ lat: this.state.cityStores.city[0].latitude, lng: this.state.cityStores.city[0].longitude}} 
/>
 {/* <Marker
          name={'Murphy Boston Inc'}
          position={{lat: 30.79204, lng: -83.7892}} /> */}
  <Marker />
  {/* <Marker
        name={'Your position'}
        icon={{ url:'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png', scaledSize: new window.google.maps.Size(50, 50) }}
        position={{
          lat: this.state.mapCenter.lat,
          lng: this.state.mapCenter.lng
        }} /> */}
     {/* <InfoWindow
        marker={this.state.activeMarker}
        onOpen={this.windowHasOpened}
        onClose={this.windowHasClosed}
        visible={this.state.showingInfoWindow}>
       <div>
            <h1>{this.state.selectedPlace.name}</h1>
        </div>
      </InfoWindow>   */}
      {this.createMarkers()} 
  </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU"
  // `${API_KEY}`
})(MapContainer);
