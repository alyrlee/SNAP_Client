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
    terms: '',
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
                            console.log(response)
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
                            console.log('city', city, area, state);
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
  this.props.onChange(this.state.data);
};

// handleTermChange = (event) => { event.preventDefault();
//   this.props.handleTermChange(this.state.terms);
// console.log('terms', terms);
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
            })
        },
        error => {
            console.error(error);
        }
    );
  };

/*  
  0:
  address: "215 Arsenal Rd"
  city: "York"
  latitude: "39.9839360"
  longitude: "-76.7277760"
  state: "PA"
  store_name: ""
  zip5: 17402
*/   


  onPlaceSelected = ( place ) => {
    console.log('plc -> on selected', place);
    // check compDidMount is working first before you fix this! 
    // const city = place.address_components[0].long_name;
    // const state = place.address_components[2].long_name;
    
    const {geometry} = place;
    if (geometry) {
      const {location} = place.geometry;
      if (location) {
        this.setState({
          coordinates: {
            lat: location.lat(), 
            lng: location.lng(),
          }
        });
      }
    }
  }

  // handleTermsChange(event) {
  //   this.setState({
  //     terms: event.target.value
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


  //"https://maps.google.com/?q=Chicago,+IL,+USA&
  //formatted_address: "Chicago, IL, USA"
//marker = plc --> on selected

  createMarker = (cityStores) => {
    console.log('pull all snap data locations', cityStores);
    return (
      <Marker 
        key={`${cityStores.latitude}${cityStores.longitude}`}
        id={cityStores.ObjectId}
        onClick={this.onMarkerClick}
        position={{ lat: cityStores.latitude, lng: cityStores.longitude }}
        name={'Current Location'}
        title={'The marker`s title will appear as a tooltip.'}
         />
    ) 
  }

  render() {
    // if (!this.props.loaded) return <div>Loading...</div>;
    // console.log('data loading', this.props.snapLocationsList);
    console.log('ML SLL:', this.state.cityStores);

    return (

  <Map google={this.props.google}
        //  style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={14}
        center={
                {
                  lat: this.state.coordinates.lat,
                  lng: this.state.coordinates.lng
                }
              }
           >
{/* {this.state.terms} */}
  <Autocomplete
        placeholder='Search'
        // fields= {['address_components', 'formatted_address']}
        fields={['']}
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
        onChange={e => this.setState({ terms: e.target.value })}
        onClick={(places, snapLocationsList, details = null) => {
          console.log('stores and details!!', places, snapLocationsList, details);
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
        title={'The marker`s title will appear as a tooltip.'}
        name={'Store_Name'}
        // position={this.onPlaceSelected}
          />
  <Marker
        name={'Your position'}
        position={{lat: 42.3600825, lng: -71.0588801}}
    /> 
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
