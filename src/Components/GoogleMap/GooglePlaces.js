import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
import { MarkerClusterer } from '@react-google-maps/api'
Geocode.setApiKey("AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU");
Geocode.enableDebug();
const markers= [];

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    markers:[],
    marker:[],
    activeMarker: {},
    selectedPlace: {},
    places: [],
    zoom: (14),
    bounds: null,
    address: '',
    city: '',
    area: '',
    state: '',
    coordinates: {
              lat: 42.3600825,
              lng: -71.0588801
    },  
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

  getMarker =(markers) => {
    let state= [];
    for(let i=0; i <markers.length; i++) {
      if(!markers) {
        state = markers[i];
        return state;
      }
    }
  }

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

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onMapClicked = (props, markers) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      markers: true
    })
  }
};

onMarkerClustererClick = (props, markers) => {
  this.setState({
    markers: props
  });
}

createMarker = (markerData) => {
  console.log('one of the locations', markerData);
  return (
    <Marker 
      key={`${markerData.Store_Name.latitude}${markerData.Store_Name.longitude}`}
      id={markerData.Store_Name.ObjectId}
      // google={this.props.google}
      // markers={this.props.markerData}
      // onClick={this.onMarkerClick}
      position={{ latitude: markerData.Store_Name.latitude, longitude: markerData.Store_Name.longitude }}
      name={'Current Location'}
      title={'The marker`s title will appear as a tooltip.'}
      // draggable={true}
      // onDragEnd={this.onMarkerDragEnd} 
      />
     ) 
  }

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;
    console.log('data loading', this.props.stores);
    console.log('markers', this.props.markers);
    
    return (
      <Map
          key={this.state.coordinates.lat+this.state.coordinates.lng} 
          google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}>
        {/* <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat: 37.778519, lng: -122.405640}} />
        <Marker
          name={'Dolores park'}
          position={{lat: 37.759703, lng: -122.428093}} />
        <Marker />
        <Marker
          name={'Your position'}
          position={{lat: 37.762391, lng: -122.439192}}
        /> */}
        {this.props.markers && this.props.markers.map(markers => this.createMarker(markers))}
      </Map>
    );
  //     <Map
  //         key={this.state.coordinates.lat+this.state.coordinates.lng} 
  //         google={this.props.google}
  //         onClick={this.onMapClicked}
  //         initialCenter={
  //           {
  //             lat: this.state.coordinates.lat,
  //             lng: this.state.coordinates.lng
  //           }
  //         }
  //         zoom={14}     
  //     >

  //     <Marker 
  //         onClick={this.onMarkerClick}
  //         name={'Current location'}
  //         />
  
  //     {/* <MarkerClusterer
  //         onClick={this.onMarkerClustererClick}
  //         averageCenter
  //         enableRetinaIcons
  //         gridSize={60}
  //         maxZoom={15}
  //         options={{ imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }}
  //   >
  //     {this.props.markers.map(markers =>this.createMarker(markers))}
  //     {this.props.children}
  //     {(clusterer) =>  markers.map((lat, lng) => (
  //       <Marker
  //         key={markers.ObjectId(lat, lng)}
  //         position={{ lat: markers.latitude, lng: markers.longitude }}
  //         clusterer={clusterer}
  //       />
  //     ))
  // }
  //   </MarkerClusterer>     */}
      
  //     <Autocomplete
  //          placeholder='Search'
  //          fields= {['']}
  //          ref={input => this.search = input}
  //          input id="searchTextField"
  //          style={{
  //             width: '100%',
  //             height: '25px',
  //             paddingLeft: '16px',
  //             // marginTop: '2px',
  //             marginBottom: '100px'
  //           }}
  //          onPlaceSelected={ this.onPlaceSelected }
  //          types={['(cities)']}
  //          componentRestrictions={{country: 'us'}}
  //          onChange={e => this.setState({ term: e.target.value })}
  //          term={{
  //             key: 'AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU',
  //             language: 'en'
  //             // search: 'value'
  //         }}
  //     />    
  //   <InfoWindow
  //         marker={this.state.activeMarker}
  //         onOpen={this.windowHasOpened}
  //         onClose={this.windowHasClosed}
  //         visible={this.state.showingInfoWindow}>
  //           <div>
  //             <h1>{this.state.selectedPlace.name}</h1>
  //           </div>
  //    </InfoWindow>
  //  </Map>
  // )
}}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU"
  // `${process.env.API_KEY}`
})(MapContainer);


 
