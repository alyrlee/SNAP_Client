import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
Geocode.setApiKey("AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU");
Geocode.enableDebug();

// const mapStyles = {
//   width: "100%",
//   height: "100%",
// };

export class MapContainer extends Component {
  state = {
    term: '',
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
    // markerPosition: {
    //   lat: 0,
    //   lng: 0
    // },
    // mapPosition: {
    //     lat: 0,
    //     lng: 0
    // },     
    // coords for Boston
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
                            // debugger;
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


  createStores = (stores) => {
    console.log('pull all stores', stores);
  }

  createMarker = (marker) => {
    console.log('pull all snap locations', marker);
    return (
      <Marker 
        key={`${marker.latitude}${marker.longitude}`}
        id={marker.objectid}
        onClick={this.onMarkerClick}
        position={{ lat: marker.latitude, lng: marker.longitude }}
        name={'Current Location'}
        title={'The marker`s title will appear as a tooltip.'}
        // draggable={true}
        // onDragEnd={this.onMarkerDragEnd} 
         />
    ) 
  }
    
  render() {
    // if (!this.props.loaded) return <div>Loading...</div>;
    console.log('data loading', this.props.snapLocationsList);
    console.log('ML SLL:', this.props.stores);
    return (

  <Map google={this.props.google}
           style={{width: '100%', height: '100%', position: 'relative'}}
           className={'map'}
           zoom={12}
           center={
                  {
                    lat: this.state.coordinates.lat,
                    lng: this.state.coordinates.lng
                  }
                }
           >
{this.props.markers && this.props.markers.map(marker => this.createMarker(marker))}
{this.props.stores && this.props.stores.map(store => this.createStores(store))}


  {/* <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'Store_Name'}
          position={{lat: Latitude, lng: Longitude}} 
          /> */}
  {/* <Marker
          name={'Murphy Boston Inc'}
          position={{lat: 30.79204, lng: -83.7892}} />
  <Marker />
  <Marker
          name={'7-eleven 32476C'}
          position={{lat: 42.364929, lng: -71.062202}}
     />
  <Marker
        name={'Your position'}
        position={{lat: 42.3600825, lng: -71.0588801}}
    /> */}
</Map>
      // <Map
      //      key={this.state.coordinates.lat+this.state.coordinates.lng} 
      //      google={this.props.google}
      //      zoom={12}
      //      style={mapStyles}
      //      center={
      //       {
      //         lat: this.state.coordinates.lat,
      //         lng: this.state.coordinates.lng
      //       }
      //     }
      //       onClick={this.onMapClicked}
      //       onReady={this.onMapReady} 
      //       stores ={this.state.stores} 
      //       // visible={false}
      // >

      //  {this.props.markers && this.props.markers.map(markData => this.createMarker(markData))}
      //  <Marker 
      //     google={this.props.google}
      //     // markers={this.props}
      //     onClick={this.onMarkerClick}
      //     name={'Current Location'}>
      //     onDragEnd={this.onMarkerDragEnd}
      //     position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
      //  </Marker>
      //    <Marker
      //     title={'The marker`s title will appear as a tooltip.'}
      //     name={'Dollar tree'}
      //     position={{lat: 32.396797, lng: -82.055046}} />
      //   <Marker
      //     title={'The marker`s title will appear as a tooltip.'}
      //     name={'Meijer Gas Station'}
      //     position={{lat: 42.3325693, lng: -83.405739}} />
      //   <Marker /> 
      //   <Marker
      //     title={'The marker`s title will appear as a tooltip.'}
      //     name={'Mercados'}
      //     position={{lat: 39.526478, lng: -122.19395}}
      //      /> 
      // <Autocomplete
      //      placeholder='Search'
      //      fields= {['']}
      //      style={{
      //         width: '100%',
      //         height: '25px',
      //         paddingLeft: '16px',
      //         // marginTop: '2px',
      //         marginBottom: '100px'
      //       }}
      //      onPlaceSelected={ this.onPlaceSelected }
      //      types={['(cities)']}
      //      componentRestrictions={{country: 'us'}}
      //      onChange={e => this.setState({ term: e.target.value })}
      //      onClick={(stores, places, snapLocationsList, details = null) => {
      //       console.log('stores and details!!', stores, places, snapLocationsList, details);
      //     }}
      //      term={{
      //         key: 'AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU',
      //         language: 'en'
      //         // search: 'value'
      //     }}
      // />    
      //   <InfoWindow
      //       marker={this.state.activeMarker}
      //       onOpen={this.windowHasOpened}
      //       onClose={this.windowHasClosed}
      //       visible={this.state.showingInfoWindow}>
      //         <div>
      //           <h1>{this.state.selectedPlace.name}</h1>
      //         </div>
      //   </InfoWindow>
      // </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU"
  // `${process.env.API_KEY}`
})(MapContainer);